"use client";
import { Button } from "@/components/ui/button.jsx";
import { useRouter } from "next/navigation";
import React from "react";
import { github } from "../utils/Icons.jsx";
import ThemeDropdown from "./ThemeDropdown/ThemeDropdown.jsx";
import SearchDialog from "./SearchDialog/SearchDialog.jsx";
import { useGlobalContext } from "../context/globalContext.js";

function Navbar() {
  const router = useRouter();
  const { state } = useGlobalContext();

  return (
    <div className="w-full py-4 flex items-center justify-between">
      <div className="left"></div>
      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
        <SearchDialog />

        <div className="btn-group flex items-center gap-2">
          <ThemeDropdown />

          <Button
            className="source-code-btn flex items-center gap-2"
            onClick={() => {
              router.push("https://github.com/SoubhagyaGhoshal/Weatherly");
            }}
          >
            {github} Source Code
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
