import axios from "axios";
import React, { useContext, useEffect } from "react";
import { AlertContext } from "../../contexts/AlertContext";

function Pending() {
  const [requests, setRequests] = React.useState([]);

  const token = localStorage.getItem("auth_token");

  const displayAlert = useContext(AlertContext);

  const handleCancel = (id) => {
    axios
      .post(
        `/api/user/mentee/cancel_pending_request/${id}/`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        getRequests();
        displayAlert("Request cancelled successfully!", true);
      })
      .catch((err) => {
        console.log(err);
        displayAlert("Something went wrong!", false);
      });
  };

  const getRequests = () => {
    axios
      .get("/api/user/mentee/get_pending_requests/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setRequests(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRequests();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1 className="text-center text-4xl font-bold dark:text-gray-200">
        Pending Requests
      </h1>
      <div className="w-3/4 mx-auto">
        {requests.length > 0 ? (
          <div>
            <div>
              <div className="flex flex-col my-5">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-auto">
                      <ul>
                        {/* <li className="mb-2 p-2 bg-primary text-gray-200 border-b border-gray-300 shadow">

                          </li> */}
                        {requests.map((request) => (
                          <li
                            key={request.id}
                            className="mb-2 p-2 border-b border-gray-300 shadow"
                          >
                            <div className="flex justify-between">
                              {request.status === "REQUESTED_FROM_MENTOR" ? (
                                <span className="flex justify-between">
                                  <p className="dark:text-gray-200">
                                    {request.mentee.firstname}{" "}
                                    {request.mentee.lastname} (
                                    {request.mentee.username})
                                  </p>

                                  <p className="text-indigo-500 ml-4">
                                    Request to be Mentee
                                  </p>
                                </span>
                              ) : (
                                <span className="flex justify-between">
                                  <p className="dark:text-gray-200">
                                    {request.mentor.firstname}{" "}
                                    {request.mentor.lastname} (
                                    {request.mentor.username})
                                  </p>

                                  <p className="text-cyan-500 ml-4">
                                    Request to be Mentor
                                  </p>
                                </span>
                              )}
                              <span>
                                <button
                                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                  onClick={() => {
                                    handleCancel(request.id);
                                  }}
                                >
                                  <span>
                                    <svg
                                      className="w-6 h-6 inline"
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
                                  </span>
                                  Cancel Request
                                </button>
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-700 dark:text-gray-200 font-bold text-md m-2 p-2">
            You do not have any pending request!
          </p>
        )}
      </div>
    </div>
  );
}

export default Pending;
