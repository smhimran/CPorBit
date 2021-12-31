import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AlertContext } from "../../contexts/AlertContext";

function MenteeList({ problem }) {
  const [mentees, setMentees] = useState([]);

  const token = localStorage.getItem("auth_token");

  const displayAlert = useContext(AlertContext);

  const recommendProblem = (mentee) => {
    axios
      .post(
        `/api/recommendation/${mentee}/`,
        {
          cf_problem_id: problem.problem.cf_problem_id,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        displayAlert(res.data.message, true);
      })
      .catch((err) => {
        displayAlert(err.response.data.message, false);
      });
  };

  useEffect(() => {
    axios
      .get("/api/user/mentee/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setMentees(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {mentees.map((mentee) => (
        <div className="flex justify-between px-2 py-4 mx-2">
          <p className="text-lg text-gray-800 dark:text-gray-200">
            {mentee.mentee.first_name} {mentee.mentee.last_name} (
            {mentee.mentee.username})
          </p>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => recommendProblem(mentee.mentee.username)}
          >
            Recommend
          </button>
        </div>
      ))}
    </div>
  );
}

export default MenteeList;
