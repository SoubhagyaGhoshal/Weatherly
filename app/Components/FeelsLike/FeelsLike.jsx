"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { thermometer } from "@/app/utils/Icons.jsx";
import { Skeleton } from "@/components/ui/skeleton.jsx";
import React from "react";

function FeelsLike() {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast.main || forecast.main.feels_like === undefined) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { feels_like, temp_min, temp_max } = forecast.main;

  const feelsLikeRounded = Math.round(feels_like);
  const minTempRounded = Math.round(temp_min);
  const maxTempRounded = Math.round(temp_max);

  const feelsLikeText = (feelsLike, minTemp, maxTemp) => {
    const avgTemp = (minTemp + maxTemp) / 2;

    if (feelsLike < avgTemp - 5) {
      return "Feels significantly colder than actual temperature.";
    }
    if (feelsLike >= avgTemp - 5 && feelsLike <= avgTemp + 5) {
      return "Feels close to the actual temperature.";
    }
    if (feelsLike > avgTemp + 5) {
      return "Feels significantly warmer than actual temperature.";
    }

    return "Temperature feeling is typical for this range.";
  };

  const feelsLikeDescription = feelsLikeText(feelsLikeRounded, minTempRounded, maxTempRounded);

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {thermometer} Feels Like
        </h2>
        <p className="pt-4 text-2xl">{feelsLikeRounded}°</p>
      </div>

      <p className="text-sm">{feelsLikeDescription}</p>
    </div>
  );
}

export default FeelsLike;
