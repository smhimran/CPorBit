import React from "react";
import StandingsBody from "./Standings/StandingsBody";

function Standings() {
  return (
    <div className="bg-white dark:bg-gray-800 h-screen">
      <div className="container px-6 py-4 mx-auto">
        <div className="py-4 settingsHeader">
          <svg
            className="w-10 h-10 text-secondary "
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path>
          </svg>

          <h1 className="text-4xl  text-black dark:text-gray-200 ">
            Standings
          </h1>
        </div>
        <StandingsBody />
      </div>
    </div>
  );
}

export default Standings;
