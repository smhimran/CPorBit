import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AlertContext } from "../../contexts/AlertContext";

function ProfileConnections({ isConnected, username, setIsConnected }) {
  const displayAlert = useContext(AlertContext);

  const token = localStorage.getItem("auth_token");

  const requestToBeMentor = () => {
    console.log(username);
    axios
      .post(
        "/api/user/mentee/request_to_be_mentor/",
        {
          mentor: username,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        displayAlert("Request sent successfully", true);
        setIsConnected("REQUESTED_FROM_MENTOR");
      })
      .catch((err) => {
        displayAlert(err.response.data.message, false);
      });
  };

  const requestToBeMentee = () => {
    console.log(username);
    axios
      .post(
        "/api/user/mentee/request_to_be_mentee/",
        {
          mentee: username,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        displayAlert("Request sent successfully", true);
        setIsConnected("REQUESTED_FROM_MENTEE");
      })
      .catch((err) => {
        console.log(err);
        displayAlert(err.response.data.message, false);
      });
  };

  if (isConnected === "CURRENT") {
    return (
      <div className="my-2">
        <h4 className="text-md text-secondary">
          You are connected to this user
        </h4>
      </div>
    );
  } else if (isConnected === "FORMER" || isConnected === "NOT_CONNECTED") {
    return (
      <div className="my-2">
        <div>
          <button
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-primary rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            onClick={requestToBeMentor}
          >
            Request to be Mentor
          </button>
          <button
            className="w-full my-2 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-secondary rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            onClick={requestToBeMentee}
          >
            Request to be Mentee
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="my-2">
        <Link
          to="/connections"
          className="text-decoration-none text-secondary hover:text-indigo-500 text-md cursor-pointer"
        >
          You have a pending connetion request with this user
        </Link>
      </div>
    );
  }
}

export default ProfileConnections;
