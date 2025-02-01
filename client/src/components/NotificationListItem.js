import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

function NotificationListItem({ id, notification_type, is_read, index }) {
  const markAsRead = (id) => {
    const token = localStorage.getItem("auth_token");
    axios
      .put(
        `/api/notifications/${id}/mark_as_read/`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  if (notification_type === "Connection Request") {
    return (
      <li
        key={index}
        className={`text-sm px-2 py-3 font-medium text-gray-700 ${
          !is_read ? "bg-blue-200 dark:bg-gray-700" : "dark:bg-gray-800"
        }  dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-600 my-2`}
        onClick={() => markAsRead(id)}
      >
        <Link to="/connections/requests">
          <div className="flex items-center">
            You have a new mentorship request
          </div>
          <div className="items-center justify-center px-2 text-opacity-75 py-1 mr-2 text-xs font-bold leading-none text-right text-blue-400">
            mentorship-request
          </div>
        </Link>
      </li>
    );
  } else if (notification_type === "Request Accepted") {
    return (
      <li
        key={index}
        className={`text-sm px-2 py-3 font-medium text-gray-700 ${
          !is_read ? "bg-blue-200 dark:bg-gray-700" : "dark:bg-gray-800"
        }  dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-600 my-2`}
        onClick={() => markAsRead(id)}
      >
        <Link to="/connections">
          <div className="flex items-center">Your request was accepted</div>
          <div className="items-center justify-center px-2 text-opacity-75 py-1 mr-2 text-xs font-bold leading-none text-right text-green-500">
            request-accepted
          </div>
        </Link>
      </li>
    );
  } else if (notification_type === "Request Rejected") {
    return (
      <li
        key={index}
        className={`text-sm px-2 py-3 font-medium text-gray-700 ${
          !is_read ? "bg-blue-200 dark:bg-gray-700" : "dark:bg-gray-800"
        }  dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-600 my-2`}
        onClick={() => markAsRead(id)}
      >
        <Link to="/connections">
          <div className="flex items-center">Your request was rejected</div>
          <div className="items-center justify-center px-2 text-opacity-75 py-1 mr-2 text-xs font-bold leading-none text-right text-red-500">
            request-rejected
          </div>
        </Link>
      </li>
    );
  } else if (notification_type === "Submission Update") {
    return (
      <li
        key={index}
        className={`text-sm px-2 py-3 font-medium text-gray-700 ${
          !is_read ? "bg-blue-200 dark:bg-gray-700" : "dark:bg-gray-800"
        }  dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-600 my-2`}
        onClick={() => markAsRead(id)}
      >
        <Link to="/submissions">
          <div className="flex items-center">
            Your submissions have been updated
          </div>
          <div className="items-center justify-center text-right text-opacity-75 px-2 py-1 mr-2 text-xs font-bold leading-none text-indigo-500">
            submissions
          </div>
        </Link>
      </li>
    );
  } else if (notification_type === "Suggestion Regenerate") {
    return (
      <li
        key={index}
        className={`text-sm px-2 py-3 font-medium text-gray-700 ${
          !is_read ? "bg-blue-200 dark:bg-gray-700" : "dark:bg-gray-800"
        }  dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-600 my-2`}
        onClick={() => markAsRead(id)}
      >
        <Link to="/suggestions">
          <div className="flex items-center">
            Your suggestions have been generated
          </div>
          <div className="items-center justify-center text-right text-opacity-75 px-2 py-1 mr-2 text-xs font-bold leading-none  text-purple-500 ">
            suggestions
          </div>
        </Link>
      </li>
    );
  } else {
    return <></>;
  }
}

export default NotificationListItem;
