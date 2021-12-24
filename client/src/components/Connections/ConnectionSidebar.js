import React from "react";
import { NavLink } from "react-router-dom";

function ConnectionSidebar() {
  return (
    <aside className="h-screen sticky top-0">
      <div className="flex flex-col justify-between flex-1">
        <div className="w-full md:h-screen py-8 bg-white border-r dark:bg-gray-800 dark:border-gray-600">
          <div className="flex flex-col justify-between flex-1 ">
            <nav>
              <NavLink
                className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
                to="/connections"
                activeClassName="bg-gray-200 dark:bg-gray-700 dark:text-white"
                exact
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                </svg>
                <span className="mx-4 font-medium">Connections</span>
              </NavLink>
              <NavLink
                className="flex items-center px-4 py-2 mt-2 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
                to="/connections/requests"
                activeClassName="bg-gray-200 dark:bg-gray-700 dark:text-white"
                exact
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                </svg>
                <span className="mx-4 font-medium">Requests</span>
              </NavLink>
              <NavLink
                className="flex items-center px-4 py-2 mt-2 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
                to="/connections/pending"
                activeClassName="bg-gray-200 dark:bg-gray-700 dark:text-white"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>

                <span className="mx-4 font-medium">Pending Requests</span>
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default ConnectionSidebar;
