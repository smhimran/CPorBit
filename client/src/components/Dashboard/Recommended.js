import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Recommended() {
  const [problems, setProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    axios
      .get("/api/recommendation/?limit=5", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setProblems(res.data.recommendations);
        // console.log(res.data.suggetions);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });

    // eslint-disable-next-line
  }, []);

  return (
    <div className="mb-2">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 ">
        Recommended Problems
      </h1>

      {isLoading ? (
        <div className=" flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div>
          {problems.length > 0 ? (
            <div className="flex flex-col">
              {problems.map((problem, index) => {
                if (problem.problem.is_solved) {
                  return (
                    <div
                      className="flex flex-row justify-between my-2 px-2 bg-green-200 bg-opacity-25 hover:bg-gray-200 dark:hover:bg-gray-700"
                      key={index}
                    >
                      <Link to={`/problem/${problem.problem.cf_problem_id}`}>
                        <div>
                          <h5 className="text-lg text-left font-bold text-gray-800 dark:text-gray-200">
                            {problem.problem.cf_problem_id} -{" "}
                            {problem.problem.cf_problem_name}
                          </h5>

                          <div className="flex flex-wrap flex-row my-2 py-1">
                            <ul className="list-none">
                              {problem.problem.tag.map((tag, index) => (
                                <li
                                  key={index}
                                  className="inline-block px-2 py-1 mr-2 text-xs bg-gray-500 dark:bg-gray-600 text-gray-200 font-bold rounded-md"
                                >
                                  {tag}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </Link>
                      <div className="text-green-500 text-lg">
                        <i className="fa fa-check"></i>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      className="flex flex-row justify-between my-2 px-2"
                      key={index}
                    >
                      <Link to={`/problem/${problem.problem.cf_problem_id}`}>
                        <div>
                          <h5 className="text-lg text-left font-bold text-gray-800 dark:text-gray-200">
                            {problem.problem.cf_problem_id} -{" "}
                            {problem.problem.cf_problem_name}
                          </h5>

                          <div className="flex flex-wrap flex-row my-2 py-1">
                            <ul className="list-none">
                              {problem.problem.tag.map((tag, index) => (
                                <li
                                  key={index}
                                  className="inline-block px-2 py-1 mr-2 text-xs bg-gray-500 dark:bg-gray-600 text-gray-200 font-bold rounded-md"
                                >
                                  {tag}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </Link>
                      <div>&nbsp;&nbsp;</div>
                    </div>
                  );
                }
              })}
            </div>
          ) : (
            <h4 className="text-center text-lg text-gray-800 dark:text-gray-200">
              You don't have any Mentor Recommended Problem.
            </h4>
          )}
        </div>
      )}

      <div className="text-center text-indigo-500 text-xl font-bold my-2 py-2 hover:bg-gray-300 dark:hover:bg-gray-700">
        <Link to="/recommendations">View All Recommendations</Link>
      </div>
    </div>
  );
}

export default Recommended;
