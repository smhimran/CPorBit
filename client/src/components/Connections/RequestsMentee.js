import axios from "axios";
import React, { useContext, useEffect } from "react";
import { AlertContext } from "../../contexts/AlertContext";

function RequestsMentee() {
  const [requests, setRequests] = React.useState([]);

  const token = localStorage.getItem("auth_token");

  const displayAlert = useContext(AlertContext);

  const getRequests = () => {
    axios
      .get("/api/user/mentee/get_requests_to_be_mentee/", {
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

  const handleAccept = (id) => {
    axios
      .put(
        `/api/user/mentee/accept_request/${id}/`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        getRequests();
        displayAlert("Request accepted successfully!", true);
      })
      .catch((err) => {
        console.log(err);
        displayAlert("Something went wrong!", false);
      });
  };

  const handleReject = (id) => {
    axios
      .put(
        `/api/user/mentee/reject_request/${id}/`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        getRequests();
        displayAlert("Request rejected successfully!", true);
      })
      .catch((err) => {
        console.log(err);
        displayAlert("Something went wrong!", false);
      });
  };

  useEffect(() => {
    getRequests();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="dark:bg-gray-800">
        <h1 className="text-center text-3xl text-primary dark:text-gray-200 font-bold p-5">
          Requests to be Mentee
        </h1>
        <div className="w-3/4 mx-auto">
          {requests.length > 0 ? (
            <div>
              <div>
                <div className="flex flex-col my-5">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="overflow-auto ">
                        <ul>
                          {requests.map((request) => (
                            <li
                              key={request.id}
                              className="mb-2 p-2 border-b border-gray-300 shadow"
                            >
                              <div className="flex justify-between">
                                <p className="dark:text-gray-200">
                                  {request.mentor.first_name}{" "}
                                  {request.mentor.last_name} (
                                  {request.mentor.username})
                                </p>
                                <span>
                                  <button
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    onClick={() => {
                                      handleAccept(request.id);
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
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clip-rule="evenodd"
                                        ></path>
                                      </svg>
                                    </span>
                                    Accept
                                  </button>
                                  <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => {
                                      handleReject(request.id);
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
                                    Reject
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
              You do not have any request!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RequestsMentee;
