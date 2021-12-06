import axios from "axios";
import React, { useEffect, useState } from "react";
import NotificationListItem from "../NotificationListItem";

function AllNotifications() {
  const [notifications, setNotifications] = useState([]);

  const token = localStorage.getItem("auth_token");

  const markAllAsRead = () => {
    axios
      .put(
        `/api/notifications/mark_all_as_read/`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        axios
          .get("/api/notifications/all", {
            headers: {
              Authorization: `Token ${token}`,
            },
          })
          .then((res) => {
            setNotifications(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const markAsRead = (id) => {
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
      .then((res) => {
        axios
          .get("/api/notifications/all", {
            headers: {
              Authorization: `Token ${token}`,
            },
          })
          .then((res) => {
            setNotifications(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = () => {
    axios
      .delete("/api/notifications/clear_all/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then(() => {
        setNotifications([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("/api/notifications/all", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setNotifications(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // eslint-disable-next-line
  }, []);

  return (
    <div className="dark:bg-gray-800 h-screen">
      <h1 className="text-center text-3xl text-primary dark:text-gray-200 font-bold p-5">
        Notifications
      </h1>
      <div className="w-3/4 mx-auto">
        <div className="flex flex-row-reverse m-2">
          <button
            className="flex items-center px-2 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-green-600 rounded-md ml-2 hover:bg-green-500 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-80"
            onClick={markAllAsRead}
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="mx-1">Mark all as read</span>
          </button>
          <button
            className="flex items-center px-2 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80"
            onClick={handleDelete}
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="mx-1">Clear all</span>
          </button>
        </div>
        {notifications.length > 0 ? (
          <ul className="list-none">
            {notifications.map((notification, index) => (
              <NotificationListItem
                notification_type={notification.notification_type}
                is_read={notification.is_read}
                index={index}
                key={index}
                onClick={() => markAsRead(notification.id)}
              />
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-700 dark:text-gray-200 font-bold text-md m-2 p-2">
            No notifications
          </p>
        )}
      </div>
    </div>
  );
}

export default AllNotifications;
