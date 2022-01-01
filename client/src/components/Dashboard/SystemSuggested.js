import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AlertContext } from "../../contexts/AlertContext";

function SystemSuggested() {
  const [problems, setProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("auth_token");

  const displayAlert = useContext(AlertContext);

  const getNewSuggestions = () => {
    axios
      .post(
        "/api/suggestion/",
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        displayAlert(
          `${res.data.message}. Please reload the page after a few seconds to see the changes.`,
          true
        );
      })
      .catch((err) => {
        displayAlert(`${err.response.data.message}`, false);
      });
  };

  useEffect(() => {
    axios
      .get("/api/suggestion/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setProblems(res.data.suggetions);
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
    <div className="md:w-3/5">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 ">
        System Suggested Problems
      </h1>

      <div className="flex flex-row-reverse">
        <button
          className="bg-primary text-gray-200 font-bold py-2 px-4 my-2 rounded-lg"
          onClick={getNewSuggestions}
        >
          Get New Suggestions
        </button>
      </div>

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
                          <h5 className="text-xl text-left font-bold text-gray-800 dark:text-gray-200">
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
                      <div className="text-green-500 text-xl">
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
                          <h5 className="text-xl text-left font-bold text-gray-800 dark:text-gray-200">
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
            <h4 className="text-center textxl text-gray-800 dark:text-gray-200">
              You don't have any System Suggested Problem. Click Get New
              Suggestions to get started!
            </h4>
          )}
        </div>
      )}
    </div>
  );
}

export default SystemSuggested;
