import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AlertContext } from "../contexts/AlertContext";
import MenteeList from "./ProblemView/MenteeList";

function Problem() {
  const [problem, setProblem] = useState({
    problem: {
      cf_problem_id: "",
      cf_problem_name: "",
      is_solved: false,
      score: 0,
      total_solved: 0,
      tag: [],
    },
    cf_contest_id: 0,
    cf_problem_index: "",
    is_favourite: false,
    is_suggested: false,
    is_recommended: false,
  });

  const [isFound, setIsFound] = useState(false);

  const { problem_id } = useParams();

  const displayAlert = useContext(AlertContext);

  const token = localStorage.getItem("auth_token");

  const markAsFavorite = () => {
    axios
      .post(
        `/api/favorite/`,
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
        problem.is_favourite = true;
        displayAlert(res.data.message, true);
      })
      .catch((err) => {
        console.log(err);
        displayAlert(err.response.data.message, false);
      });
  };

  const unmarkAsFavorite = () => {
    axios
      .delete(`/api/favorite/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
        data: {
          cf_problem_id: problem.problem.cf_problem_id,
        },
      })
      .then((res) => {
        problem.is_favourite = false;
        displayAlert(res.data.message, true);
      })
      .catch((err) => {
        console.log(err);
        displayAlert(err.response.data.message, false);
      });
  };

  useEffect(() => {
    axios
      .get(`/api/problem/${problem_id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setIsFound(true);
        setProblem(res.data.problem);
      })
      .catch((err) => {
        console.log(err);
      });

    // eslint-disable-next-line
  }, []);

  if (isFound) {
    return (
      <div className="dark:bg-gray-800  py-10 h-screen">
        <div className="container px-6 mx-auto">
          <h1 className="text-3xl font-bold text-black dark:text-gray-200">
            {problem.problem.cf_problem_id} - {problem.problem.cf_problem_name}
          </h1>
          <div className="flex flex-wrap flex-row my-2 py-2">
            <ul className="list-none">
              {problem.problem.tag.map((tag, index) => (
                <li
                  key={index}
                  className="inline-block px-2 py-1 mr-2 text-sm bg-gray-500 dark:bg-gray-600 text-gray-200 font-bold rounded-md"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap flex-row my-2">
            {problem.is_favourite ? (
              <div className="inline-block px-2 py-2 mr-2 text-md text-yellow-300">
                <span className="text-lg text-yellow-300">
                  <i className="fa fa-star" onClick={unmarkAsFavorite}></i>
                </span>
              </div>
            ) : (
              <div className="inline-block px-2 py-2 mr-2 text-md text-gray-500">
                <span className="text-lg text-gray-500">
                  <i className="fa fa-star" onClick={markAsFavorite}></i>
                </span>
              </div>
            )}

            {problem.is_suggested && (
              <div className="inline-block px-2 py-2 font-bold mr-2 rounded-lg bg-primary text-gray-200">
                System Suggested
              </div>
            )}

            {problem.is_recommended && (
              <div className="inline-block px-2 py-2 font-bold rounded-lg bg-secondary text-gray-200">
                Recommended by Mentor
              </div>
            )}
          </div>

          <div className="py-2 my-2 text-gray-800 dark:text-gray-200 text-lg">
            <span className="font-bold">Score:</span> {problem.problem.score}
          </div>
          <div className="py-2 my-2 text-gray-800 dark:text-gray-200 text-lg">
            <span className="font-bold">
              <i className="fa fa-users"></i> Solved By:
            </span>{" "}
            {problem.problem.total_solved}
          </div>

          <div className="my-2 py-2">
            {problem.problem.is_solved ? (
              <a
                className="text-decoration-none"
                rel="noreferrer"
                target={"_blank"}
                href={`http://codeforces.com/contest/${problem.cf_contest_id}/problem/${problem.cf_problem_index}`}
              >
                <div className="inline-block px-4 py-3 mr-2 text-md bg-green-500 hover:bg-green-600 text-gray-100 font-bold">
                  <span className="text-lg ">
                    <i className="fa fa-check-circle"></i>
                  </span>
                  &nbsp;&nbsp;Solved
                </div>
              </a>
            ) : (
              <a
                className="text-decoration-none"
                rel="noreferrer"
                target={"_blank"}
                href={`http://codeforces.com/contest/${problem.cf_contest_id}/problem/${problem.cf_problem_index}`}
              >
                <div className="inline-block px-3 py-3 mr-2 text-md bg-indigo-500 hover:bg-indigo-600 text-gray-100 font-bold">
                  Solve this problem
                </div>
              </a>
            )}
          </div>

          <div className="my-2 py-2">
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
              Recommend this problem to mentees
            </h2>

            <MenteeList problem={problem} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="dark:bg-gray-800  py-4 h-screen">
        <div className="container px-6 mx-auto">
          <h1 className="text-3xl font-bold text-black dark:text-gray-200">
            Problem Does not exist
          </h1>
        </div>
      </div>
    );
  }
}

export default Problem;
