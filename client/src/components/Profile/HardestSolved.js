import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function HardestSolved() {
  const [problem, setProblem] = React.useState({});

  const { username } = useParams();

  useEffect(() => {
    axios
      .get(`/api/standings/profile/${username}/hardest_solved_problem/`)
      .then((res) => {
        setProblem(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // eslint-disable-next-line
  }, []);

  return (
    <div className="my-2 py-2 dark:text-gray-200">
      <span className="font-bold">Hardest Solved Problem:</span>{" "}
      {problem.cf_id + " - " + problem.name}
    </div>
  );
}

export default HardestSolved;
