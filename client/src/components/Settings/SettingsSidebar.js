import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

function SettingsSidebar() {
  // Contexts
  const userContext = React.useContext(UserContext);

  const [user, setUser] = useState({
    first_name: userContext.firstName,
    last_name: userContext.lastName,
    email: "",
    avatar: "",
  });

  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    axios
      .get("/auth/users/me", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        const newUser = res.data;

        axios
          .get(`/user/profile/${newUser.id}`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          })
          .then((res) => {
            userContext?.setFirstName(newUser.first_name);
            userContext?.setLastName(newUser.last_name);
            setUser(newUser);
          });
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className=" w-full md:h-screen py-8 mt-1 bg-white border-r dark:bg-gray-800 dark:border-gray-600">
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white">
          Settings
        </h2>

        <div className="flex flex-col items-center mt-6 -mx-2">
          <img
            className="object-cover w-24 h-24 mx-2 rounded-full"
            src={userContext.avatar}
            alt={`${user.first_name} ${user.last_name}`}
          />
          <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200 hover:underline">
            {`${user.first_name} ${user.last_name}`}
          </h4>
          <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:underline">
            {user.email}
          </p>
        </div>

        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav>
            <NavLink
              className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
              to="/settings"
              activeClassName="bg-gray-200 dark:bg-gray-700 dark:text-white"
              exact
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="mx-4 font-medium">Accounts</span>
            </NavLink>
            <NavLink
              className="flex items-center px-4 py-2 mt-2 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
              to="/settings/profile"
              activeClassName="bg-gray-200 dark:bg-gray-700 dark:text-white"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clipRule="evenodd"
                ></path>
              </svg>

              <span className="mx-4 font-medium">Profile</span>
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default SettingsSidebar;
