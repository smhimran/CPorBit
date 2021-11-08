import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AlertContext } from "../../contexts/AlertContext";
import { UserContext } from "../../contexts/UserContext";
import UpdatePassword from "./UpdatePassword";

function AccountSettings() {
  // States
  const [userInfo, setUserInfo] = useState({});
  const [currentPassword, setCurrentPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isUsernameLoading, setIsUsernameLoading] = useState(false);

  const token = localStorage.getItem("auth_token");

  // Contexts
  const user = useContext(UserContext);
  const displayAlert = useContext(AlertContext);

  // Update user info
  const updateUser = (e) => {
    e.preventDefault();

    setIsLoading(true);

    axios
      .put("/auth/users/me/", userInfo, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        user?.setUser(userInfo.username);
        user?.setEmail(userInfo.email);
        user?.setFirstName(userInfo.first_name);
        user?.setLastName(userInfo.last_name);

        setIsLoading(false);

        displayAlert(
          "Account updated successfully! You'll recieve an email to confirm the changes!",
          true
        );
      })
      .catch((err) => {
        setIsLoading(false);
        displayAlert("Something went wrong! Please try again...", false);
        console.log(err);
      });
  };

  // Update Username
  const updateUsername = (e) => {
    e.preventDefault();

    setIsUsernameLoading(true);

    axios
      .post(
        "/auth/users/set_username/",
        { new_username: userInfo.username, current_password: currentPassword },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        setIsUsernameLoading(false);

        displayAlert("Username updated successfully!", true);
      })
      .catch((err) => {
        setIsUsernameLoading(false);
        displayAlert("Something went wrong! Please try again...", false);
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("/auth/users/me/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <section className="max-w-4xl p-6 bg-white dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          Account settings
        </h2>

        <form onSubmit={updateUser}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={userInfo.first_name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, first_name: e.target.value })
                }
              />
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="emailAddress"
              >
                Last Name
              </label>
              <input
                id="emailAddress"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={userInfo.last_name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, last_name: e.target.value })
                }
              />
            </div>
          </div>
          <div className="mt-6">
            <label
              className="text-gray-700 dark:text-gray-200"
              htmlFor="emailAddress"
            >
              Email Address
            </label>
            <input
              id="emailAddress"
              type="email"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end mt-6">
            <button
              className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-primary rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className=" flex justify-center items-center">
                  <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-white"></div>
                </div>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label
              className="text-gray-700 dark:text-gray-200"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              value={userInfo.username}
              onChange={(e) =>
                setUserInfo({ ...userInfo, username: e.target.value })
              }
            />
          </div>
          <div>
            <label
              className="text-gray-700 dark:text-gray-200"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-primary rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            disabled={isUsernameLoading}
            onClick={updateUsername}
          >
            {isUsernameLoading ? (
              <div className=" flex justify-center items-center">
                <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : (
              "Update Username"
            )}
          </button>
        </div>

        <UpdatePassword />
      </section>
    </div>
  );
}

export default AccountSettings;
