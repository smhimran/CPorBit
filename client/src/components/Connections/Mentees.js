import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AlertContext } from "../../contexts/AlertContext";

function Mentees() {
  const [mentees, setMentees] = useState([]);

  const displayAlert = useContext(AlertContext);

  const token = localStorage.getItem("auth_token");

  const getMentees = () => {
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
  };

  const handleClose = (username) => {
    axios
      .post(`/api/user/mentee/close_connection/`, {
        username,
      })
      .then((res) => {
        getMentees();
        displayAlert(res.data.message, true);
      })
      .catch((err) => {
        displayAlert("Failed to close connection!", false);
      });
  };

  useEffect(() => {
    getMentees();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="dark:bg-gray-800">
        <h1 className="text-center text-3xl text-primary dark:text-gray-200 font-bold p-5">
          Mentees
        </h1>
        <div className="w-3/4 mx-auto">
          {mentees.length > 0 ? (
            <div>
              <div>
                <div className="flex flex-col my-5">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-primary text-white">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-4 text-left text-xs font-medium text-gray-200 uppercase tracking-wider w-5/12"
                              >
                                Name
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-4 text-left text-xs font-medium text-gray-200 uppercase tracking-wider w-4/12"
                              >
                                Username
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-4 text-left text-xs font-medium text-gray-200 uppercase tracking-wider w-3/12"
                              ></th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:text-gray-200">
                            {mentees.map((mentee, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap w-2/12 dark:bg-gray-800">
                                  <div className="text-sm font-medium text-gray-900 dark:text-gray-200">
                                    {mentee.mentee.first_name}{" "}
                                    {mentee.mentee.last_name}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap w-1/12 dark:bg-gray-800">
                                  <div className="text-sm text-gray-900 dark:text-gray-200">
                                    {mentee.mentee.username}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap w-1/12 dark:bg-gray-800">
                                  <button
                                    className="flex items-center px-2 py-2 font-medium tracking-wide text-red-500 capitalize transition-colors duration-200 transform ring ring-red-500 rounded-md hover:text-white hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80"
                                    onClick={() => {
                                      handleClose(mentee.mentee.username);
                                    }}
                                  >
                                    <svg
                                      className="w-6 h-6"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clip-rule="evenodd"
                                      ></path>
                                    </svg>
                                    <span className="mx-1">
                                      Close Connection
                                    </span>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-700 dark:text-gray-200 font-bold text-md m-2 p-2">
              You do not have any mentee!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Mentees;
