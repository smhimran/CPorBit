import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function AllProblems() {
  const [search, setSearch] = React.useState("");
  const [problems, setProblems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const token = localStorage.getItem("auth_token");

  const searchProblem = () => {
    console.log("clicked");

    setIsLoading(true);

    axios
      .get(`/api/problem/?id=${search}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setProblems(res.data.problems);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    axios
      .get("/api/problem/?limit=20", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setProblems(res.data.problems);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });

    // eslint-disable-next-line
  }, []);

  return (
    <div className="dark:bg-gray-800 py-4 min-h-screen h-full">
      <div className="container px-6 mx-auto">
        <h1 className="text-3xl text-gray-800 dark:text-gray-200 text-center font-bold">
          Problems
        </h1>

        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex items-center my-2 w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mr-2 text-primary dark:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              name="search"
              placeholder="Search Problem (by id)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  searchProblem();
                }
              }}
              className="w-full mr-2 text-primary dark:text-gray-200 py-2 border-b-2 dark:bg-gray-800 border-gray-400 outline-none focus:border-primary dark:focus:border-gray-200"
            />
          </div>
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg my-2 "
            onClick={searchProblem}
          >
            Search
          </button>
        </div>

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
                    className="px-6 py-5 text-left text-xs font-medium text-gray-200 uppercase tracking-wider w-6/12"
                  >
                    Problem
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-center text-xs font-medium text-gray-200 uppercase tracking-wider w-2/12"
                  >
                    Score
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-center text-xs font-medium text-gray-200 uppercase tracking-wider w-2/12"
                  >
                    People Solved
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-center text-xs font-medium text-gray-200 uppercase tracking-wider w-2/12"
                  >
                    Solved
                  </th>
                </tr>
              </thead>
              <tbody>
                {problems.map((problem, index) => {
                  if (problem.is_solved) {
                    return (
                      <tr
                        key={index}
                        className="px-3 py-3 my-2 bg-green-200 bg-opacity-25 hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        <Link to={`/problem/${problem.cf_problem_id}`}>
                          <td className="px-6 py-3 whitespace-nowrap text-xl text-left text-gray-800 dark:text-gray-200 w-6/12">
                            {problem.cf_problem_id} - {problem.cf_problem_name}
                            <div className="flex flex-wrap flex-row my-2 py-1">
                              <ul className="list-none">
                                {problem.tag.map((tag, index) => (
                                  <li
                                    key={index}
                                    className="inline-block px-2 py-1 mr-2 text-xs bg-gray-500 dark:bg-gray-600 text-gray-200 font-bold rounded-md"
                                  >
                                    {tag}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </td>
                        </Link>

                        <td className="px-6 py-3 whitespace-nowrap text-xl text-center text-indigo-500 w-2/12">
                          {problem.score}
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-xl text-center text-green-500 w-2/12">
                          {problem.total_solved}
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-xl text-center text-green-500 w-2/12">
                          <span>
                            <i className="fa fa-check"></i>
                          </span>
                        </td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr
                        key={index}
                        className="px-3 py-3 my-2 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                      >
                        <Link to={`/problem/${problem.cf_problem_id}`}>
                          <td className="px-6 py-3 whitespace-nowrap text-xl text-left text-gray-800 dark:text-gray-200  w-6/12">
                            {problem.cf_problem_id} - {problem.cf_problem_name}
                            <div className="flex flex-wrap flex-row my-2 py-1">
                              <ul className="list-none">
                                {problem.tag.map((tag, index) => (
                                  <li
                                    key={index}
                                    className="inline-block px-2 py-1 mr-2 text-xs bg-gray-500 dark:bg-gray-600 text-gray-200 font-bold rounded-md"
                                  >
                                    {tag}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </td>
                        </Link>

                        <td className="px-6 py-3 whitespace-nowrap text-xl text-center text-indigo-500 w-2/12">
                          {problem.score}
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-xl text-center text-green-500 w-2/12">
                          {problem.total_solved}
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-xl text-center text-green-500 w-2/12">
                          {""}
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllProblems;
