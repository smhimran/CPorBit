import React from "react";
import RequestsMentee from "./RequestsMentee";
import RequestsMentor from "./RequestsMentor";

function Requests() {
  return (
    <div className="mb-10">
      <h1 className="text-center text-4xl font-bold dark:text-gray-200">
        Requests
      </h1>
      <RequestsMentor />
      <RequestsMentee />
    </div>
  );
}

export default Requests;
