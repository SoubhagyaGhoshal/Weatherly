"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic"; 
import AirPollution from "./Components/AirPollution/AirPollution.jsx";
import DailyForecast from "./Components/DailyForecast/DailyForecast.jsx";
import FeelsLike from "./Components/FeelsLike/FeelsLike.jsx";
import Humidity from "./Components/Humidity/Humidity.jsx";
// Removed: export const dynamic = 'force-dynamic';
import Navbar from "./Components/Navbar.jsx";
import Population from "./Components/Population/Population.jsx";
import Pressure from "./Components/Pressure/Pressure.jsx";
import Sunset from "./Components/Sunset/Sunset.jsx";
import Temperature from "./Components/Temperature/Temperature.jsx";
import UvIndex from "./Components/UvIndex/UvIndex.jsx";
import Visibility from "./Components/Visibility/Visibility.jsx";
import Wind from "./Components/Wind/Wind.jsx";
import defaultStates from "./utils/defaultStates.jsx";
import FiveDayForecast from "./Components/FiveDayForecast/FiveDayForecast.jsx";
import { useGlobalContextUpdate } from "../app/context/globalContext.js";

// Dynamically import Mapbox component
const Mapbox = dynamic(() => import("./Components/Mapbox/Mapbox.js"), { ssr: false });

export default function Home() {
  const { setActiveCityCoords } = useGlobalContextUpdate();

  const getClickedCityCords = (lat, lon) => {
    setActiveCityCoords([lat, lon]);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setActiveCityCoords([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
          setActiveCityCoords([defaultStates[0].lat, defaultStates[0].lon]);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setActiveCityCoords([defaultStates[0].lat, defaultStates[0].lon]);
    }
  }, [setActiveCityCoords]);

  return (
    <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto">
      <Navbar />
      <div className="pb-4 flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
          <Temperature />
          <FiveDayForecast />
        </div>
        <div className="flex flex-col w-full">
          <div className="instruments grid h-full gap-4 col-span-full sm-2:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
            <AirPollution />
            <Sunset />
            <Wind />
            <DailyForecast />
            <UvIndex />
            <Population />
            <FeelsLike />
            <Humidity />
            <Visibility />
            <Pressure />
          </div>
          <div className="mapbox-con mt-4 flex gap-4">
            <Mapbox />
            <div className="states flex flex-col gap-3 flex-1">
              <h2 className="flex items-center gap-2 font-medium">Top Large Cities</h2>
              <div className="flex flex-col gap-4">
                {defaultStates.map((state, index) => (
                  <div
                    key={index}
                    className="border rounded-lg cursor-pointer dark:bg-dark-grey shadow-sm dark:shadow-none"
                    onClick={() => getClickedCityCords(state.lat, state.lon)}
                  >
                    <p className="px-6 py-4">{state.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-4 flex justify-center pb-8">
        <p className="footer-text text-sm flex items-center gap-1">
          Made by{" "}
          <a href="#" target="_blank" className="text-green-300 font-bold">
            Soubhagya
          </a>
        </p>
      </footer>
    </main>
  );
}
