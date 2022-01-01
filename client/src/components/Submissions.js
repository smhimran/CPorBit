import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { username } = useParams();

  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`/api/submission/?user=${username}&limit=50`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setSubmissions(res.data.submissions);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });

    // eslint-disable-next-line
  }, []);

  return (
    <div className="dark:bg-gray-800 py-4">
      <div className="container px-6 mx-auto">
        <h1 className="text-3xl text-gray-800 dark:text-gray-200 text-center font-bold">
          Submissions of {username}
        </h1>

        {isLoading ? (
          <div className=" flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="flex flex-col my-2">
            <table>
              <thead className="bg-primary text-gray-200 font-bold">
                <tr className="">
                  <th
                    scope="col"
                    className="px-6 py-5 text-left text-xs font-medium text-gray-200 uppercase tracking-wider w-3/13"
                  >
                    Submission ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-center text-xs font-medium text-gray-200 uppercase tracking-wider w-4/13"
                  >
                    Problem
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-center text-xs font-medium text-gray-200 uppercase tracking-wider w-3/13"
                  >
                    Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-center text-xs font-medium text-gray-200 uppercase tracking-wider w-3/13"
                  >
                    Participation Type
                  </th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission, index) => (
                  <tr
                    key={index}
                    className="px-3 py-3 my-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-3 whitespace-nowrap text-xl text-center text-indigo-500 w-3/13">
                      {submission.cf_submission_id}
                    </td>
                    <Link to={`/problem/${submission.cf_problem_id}`}>
                      <td className="px-6 py-3 whitespace-nowrap text-xl text-left text-gray-800 dark:text-gray-200 w-4/13">
                        {submission.cf_problem_id} -{" "}
                        {submission.cf_problem_name}
                      </td>
                    </Link>

                    <td className="px-6 py-3 whitespace-nowrap text-xl text-center text-green-500 w-3/13">
                      {submission.timestamp}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-xl font-bold text-center text-green-500 w-3/13">
                      {submission.participantType}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Submissions;
