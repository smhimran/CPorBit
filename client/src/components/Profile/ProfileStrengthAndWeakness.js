import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

function ProfileStrengthAndWeakness() {
  const [strengths, setStrengths] = React.useState([]);
  const [weakensses, setWeakenss] = React.useState([]);

  const { username } = useParams();

  React.useEffect(() => {
    axios
      .get(`/api/standings/profile/${username}/strengths/`)
      .then((res) => {
        setStrengths(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`/api/standings/profile/${username}/weaknesses/`)
      .then((res) => {
        setWeakenss(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="flex flex-col md:flex-row my-4 py-4">
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold dark:text-gray-200 text-center">
            Strengths
          </h2>
          <ul className="list-disc list-inside">
            {strengths.map((strength, index) => (
              <li key={index} className="dark:text-gray-200">
                {strength}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold dark:text-gray-200 text-center">
            Weaknesses
          </h2>
          <ul className="list-disc list-inside">
            {weakensses.map((weakenss, index) => (
              <li key={index} className="dark:text-gray-200">
                {weakenss}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProfileStrengthAndWeakness;
