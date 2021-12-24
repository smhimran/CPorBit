import React from "react";
import CurrentMentor from "./CurrentMentor";
import Mentees from "./Mentees";
import PastMentees from "./PastMentees";
import PastMentors from "./PastMentors";

function Current() {
  return (
    <div>
      <h1 className="text-center text-4xl font-bold dark:text-gray-200">
        Current Connections
      </h1>
      <CurrentMentor />

      <Mentees />

      <PastMentors />

      <PastMentees />
    </div>
  );
}

export default Current;
