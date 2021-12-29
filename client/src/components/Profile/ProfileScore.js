import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProfileScore() {
  const [profileScore, setProfileScore] = useState({});
  const { username } = useParams();

  useEffect(() => {
    axios
      .get(`/api/standings/profile/${username}/`)
      .then((res) => {
        setProfileScore(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="my-5 py-4 px-2">
        <h5 className="text-md dark:text-gray-200">
          <span className="font-bold">Solved:</span>{" "}
          {profileScore.solve_count || 0}
        </h5>
        <h5 className="text-md dark:text-gray-200">
          <span className="font-bold">Score:</span> {profileScore.score || 0}
        </h5>
      </div>
    </div>
  );
}

export default ProfileScore;
