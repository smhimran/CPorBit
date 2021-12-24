import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { matchPath, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { AlertContext } from "../contexts/AlertContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { UserContext } from "../contexts/UserContext";
import NotificationListItem from "./NotificationListItem";

function Navbar() {
  const [hide, setHide] = useState(false);
  const [collapse, setCollapse] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);

  // Contexts
  const user = useContext(UserContext);
  const displayAlert = useContext(AlertContext);
  const theme = useContext(ThemeContext);

  // handle outside click
  const menuRef = useRef();

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setShowMenu(false);
      setShowNotifications(false);
    }
  };

  let path = useLocation();

  useEffect(() => {
    const pathsWithoutNav = [
      "/login",
      "/register",
      "/password-reset",
      "/activate",
      "/password/reset/confirm/:uid/:token",
    ];

    setHide(false);

    pathsWithoutNav.forEach((singlePath, index) => {
      if (matchPath(path.pathname, { path: singlePath })) {
        setHide(true);
      }
    });

    if (theme.dark) {
      setIsDark(true);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

    // eslint-disable-next-line
  }, [path]);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    axios
      .get("/api/notifications/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setUnread(res.data.unread);
        setNotifications(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });

    if (token) {
      setInterval(() => {
        axios
          .get("/api/notifications/", {
            headers: {
              Authorization: `Token ${token}`,
            },
          })
          .then((res) => {
            setUnread(res.data.unread);
            setNotifications(res.data.results);
          })
          .catch((err) => {
            console.log(err);
          });
      }, 1000);
    }
  }, []);

  const handleLogout = () => {
    const token = localStorage.getItem("auth_token");
    axios
      .post(
        "/auth/token/logout/",
        {},
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((res) => {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
        localStorage.removeItem("user_email");
        user.setUser("");
        user.setIsAuthenticated(false);

        displayAlert("You have been logged out!", true);
      })
      .catch((err) => {
        displayAlert("Some error occured!", false);
      });
  };

  const handleToggle = (e) => {
    e.stopPropagation();

    if (isDark) {
      setIsDark(false);
      theme.toggleTheme(false);
    } else {
      setIsDark(true);
      theme.toggleTheme(true);
    }
  };

  return (
    <>
      {!hide && (
        <div>
          <nav className="bg-white shadow dark:bg-gray-800">
            <div className="container px-6 py-4 mx-auto">
              <div className="md:flex md:items-center md:justify-between">
                <div className="flex items-center justify-between">
                  <div className="text-xl font-semibold text-gray-700">
                    <Link
                      className="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
                      to="/"
                    >
                      <h2 className="text-2xl font-semibold text-center text-primary dark:text-white">
                        CP<i className="text-secondary">or</i>Bit
                      </h2>
                    </Link>
                  </div>

                  <div className="flex md:hidden">
                    <button
                      type="button"
                      className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                      aria-label="toggle menu"
                      onClick={() => {
                        if (collapse) {
                          setCollapse(false);
                        } else {
                          setCollapse(true);
                        }
                      }}
                    >
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                        <path
                          fillRule="evenodd"
                          d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex-1 md:flex md:items-center md:justify-between">
                  <div className={`${collapse ? "hidden" : "block"} md:block`}>
                    <div
                      className="flex flex-col -mx-4 md:flex-row md:items-center md:mx-8"
                      onClick={() => setCollapse(false)}
                    >
                      <Link
                        to="/"
                        className="px-2 py-1 mx-2 mt-2 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded-md md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
                      >
                        Home
                      </Link>
                      <Link
                        to="/standings"
                        className="px-2 py-1 mx-2 mt-2 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded-md md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
                      >
                        Standings
                      </Link>

                      <Link
                        to="/about"
                        className="px-2 py-1 mx-2 mt-2 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded-md md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
                      >
                        About
                      </Link>
                    </div>
                  </div>

                  <div className={`${collapse ? "hidden" : "block"} md:block`}>
                    {user.isAuthenticated ? (
                      <div
                        className="flex items-center mt-4 md:mt-0 relative"
                        ref={menuRef}
                      >
                        <button
                          className="block mx-4 text-gray-600 md:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none"
                          aria-label="show notifications"
                          onClick={() => {
                            setShowNotifications(!showNotifications);
                            setShowMenu(false);
                          }}
                        >
                          <svg
                            className="w-6 h-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>

                        {unread === 0 ? (
                          <></>
                        ) : (
                          <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full absolute left-7 md:right-7 -top-1">
                            {unread}
                          </span>
                        )}

                        {showNotifications && (
                          <div className="absolute -right-50 top-10 md:right-0 z-20 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                            <div className="rounded-lg">
                              <div className="">
                                {notifications.length === 0 ? (
                                  <p className="text-center text-gray-700 dark:text-gray-200 font-bold text-md m-2 p-2">
                                    No notifications
                                  </p>
                                ) : (
                                  <ul
                                    className="list-none w-11/12 mx-auto"
                                    onClick={() => setShowNotifications(false)}
                                  >
                                    {notifications.map(
                                      (notification, index) => (
                                        <NotificationListItem
                                          id={notification.id}
                                          notification_type={
                                            notification.notification_type
                                          }
                                          is_read={notification.is_read}
                                          index={index}
                                          key={index}
                                        />
                                      )
                                    )}
                                  </ul>
                                )}
                              </div>
                              <div className="text-center py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500">
                                <Link
                                  to="/notifications"
                                  className="text-decoration-none text-primary dark:text-gray-200 font-bold"
                                  onClick={() => setShowNotifications(false)}
                                >
                                  Show all
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* dropdown */}

                        <div className="relative inline-block ">
                          {/* <!-- Dropdown toggle button --> */}
                          <button
                            type="button"
                            className="flex  items-center focus:outline-none"
                            aria-label="toggle profile dropdown"
                            onClick={() => {
                              setShowMenu(!showMenu);
                              setShowNotifications(false);
                            }}
                          >
                            <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                              <img
                                src={user.avatar}
                                className="object-cover w-full h-full"
                                alt="avatar"
                              />
                            </div>

                            <h3 className="mx-2 text-sm font-medium text-gray-700 dark:text-gray-200 md:hidden">
                              username
                            </h3>
                          </button>

                          {/* <!-- Dropdown menu --> */}
                          {showMenu && (
                            <div
                              className="absolute -right-50 md:right-0 z-20 w-60 py-2 mt-2 bg-white rounded-md shadow-xl dark:bg-gray-800"
                              onClick={() => {
                                setShowMenu(false);
                                setCollapse(true);
                              }}
                            >
                              <Link
                                to="/profile"
                                className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                              >
                                <img
                                  className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
                                  src={user.avatar}
                                  alt="default avatar"
                                />
                                <div className="mx-1">
                                  <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                                    {user.user}
                                  </h1>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {user.email}
                                  </p>
                                </div>
                              </Link>

                              <Link
                                to="/profile"
                                className="flex items-center px-3 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                              >
                                <svg
                                  className="w-5 h-5 mx-1"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8ZM12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z"
                                    fill="currentColor"
                                  ></path>
                                  <path
                                    d="M6.34315 16.3431C4.84285 17.8434 4 19.8783 4 22H6C6 20.4087 6.63214 18.8826 7.75736 17.7574C8.88258 16.6321 10.4087 16 12 16C13.5913 16 15.1174 16.6321 16.2426 17.7574C17.3679 18.8826 18 20.4087 18 22H20C20 19.8783 19.1571 17.8434 17.6569 16.3431C16.1566 14.8429 14.1217 14 12 14C9.87827 14 7.84344 14.8429 6.34315 16.3431Z"
                                    fill="currentColor"
                                  ></path>
                                </svg>

                                <span className="mx-1">view profile</span>
                              </Link>

                              <Link
                                to="/settings"
                                className="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                              >
                                <svg
                                  className="w-5 h-5 mx-1"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M13.8199 22H10.1799C9.71003 22 9.30347 21.673 9.20292 21.214L8.79592 19.33C8.25297 19.0921 7.73814 18.7946 7.26092 18.443L5.42392 19.028C4.97592 19.1709 4.48891 18.9823 4.25392 18.575L2.42992 15.424C2.19751 15.0165 2.27758 14.5025 2.62292 14.185L4.04792 12.885C3.98312 12.2961 3.98312 11.7019 4.04792 11.113L2.62292 9.816C2.27707 9.49837 2.19697 8.98372 2.42992 8.576L4.24992 5.423C4.48491 5.0157 4.97192 4.82714 5.41992 4.97L7.25692 5.555C7.50098 5.37416 7.75505 5.20722 8.01792 5.055C8.27026 4.91269 8.52995 4.78385 8.79592 4.669L9.20392 2.787C9.30399 2.32797 9.71011 2.00049 10.1799 2H13.8199C14.2897 2.00049 14.6958 2.32797 14.7959 2.787L15.2079 4.67C15.4887 4.79352 15.7622 4.93308 16.0269 5.088C16.2739 5.23081 16.5126 5.38739 16.7419 5.557L18.5799 4.972C19.0276 4.82967 19.514 5.01816 19.7489 5.425L21.5689 8.578C21.8013 8.98548 21.7213 9.49951 21.3759 9.817L19.9509 11.117C20.0157 11.7059 20.0157 12.3001 19.9509 12.889L21.3759 14.189C21.7213 14.5065 21.8013 15.0205 21.5689 15.428L19.7489 18.581C19.514 18.9878 19.0276 19.1763 18.5799 19.034L16.7419 18.449C16.5093 18.6203 16.2677 18.7789 16.0179 18.924C15.7557 19.0759 15.4853 19.2131 15.2079 19.335L14.7959 21.214C14.6954 21.6726 14.2894 21.9996 13.8199 22ZM7.61992 16.229L8.43992 16.829C8.62477 16.9652 8.81743 17.0904 9.01692 17.204C9.20462 17.3127 9.39788 17.4115 9.59592 17.5L10.5289 17.909L10.9859 20H13.0159L13.4729 17.908L14.4059 17.499C14.8132 17.3194 15.1998 17.0961 15.5589 16.833L16.3799 16.233L18.4209 16.883L19.4359 15.125L17.8529 13.682L17.9649 12.67C18.0141 12.2274 18.0141 11.7806 17.9649 11.338L17.8529 10.326L19.4369 8.88L18.4209 7.121L16.3799 7.771L15.5589 7.171C15.1997 6.90671 14.8132 6.68175 14.4059 6.5L13.4729 6.091L13.0159 4H10.9859L10.5269 6.092L9.59592 6.5C9.39772 6.58704 9.20444 6.68486 9.01692 6.793C8.81866 6.90633 8.62701 7.03086 8.44292 7.166L7.62192 7.766L5.58192 7.116L4.56492 8.88L6.14792 10.321L6.03592 11.334C5.98672 11.7766 5.98672 12.2234 6.03592 12.666L6.14792 13.678L4.56492 15.121L5.57992 16.879L7.61992 16.229ZM11.9959 16C9.78678 16 7.99592 14.2091 7.99592 12C7.99592 9.79086 9.78678 8 11.9959 8C14.2051 8 15.9959 9.79086 15.9959 12C15.9932 14.208 14.2039 15.9972 11.9959 16ZM11.9959 10C10.9033 10.0011 10.0138 10.8788 9.99815 11.9713C9.98249 13.0638 10.8465 13.9667 11.9386 13.9991C13.0307 14.0315 13.9468 13.1815 13.9959 12.09V12.49V12C13.9959 10.8954 13.1005 10 11.9959 10Z"
                                    fill="currentColor"
                                  ></path>
                                </svg>

                                <span className="mx-1">Settings</span>
                              </Link>

                              <Link
                                to="/connections"
                                className="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                              >
                                <svg
                                  className="w-5 h-5 mx-1"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                                </svg>

                                <span className="mx-1">Connections</span>
                              </Link>

                              <hr className="border-gray-200 dark:border-gray-700 " />

                              <div className="flex items-center px-3 py-3 text-sm text-gray-600  capitalize transition-colors duration-200 transform dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                <label
                                  htmlFor="toggleB"
                                  className="flex items-center cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                >
                                  <div className="relative">
                                    <input
                                      type="checkbox"
                                      id="toggleB"
                                      className="sr-only"
                                      checked={isDark}
                                      onChange={handleToggle}
                                    />

                                    <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>

                                    <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                                  </div>

                                  <div className="ml-3 text-gray-700 dark:text-gray-200 font-medium">
                                    Dark theme
                                  </div>
                                </label>
                              </div>

                              <hr className="border-gray-200 dark:border-gray-700 " />

                              <button
                                className="w-full flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                                onClick={handleLogout}
                              >
                                <svg
                                  className="w-5 h-5 mx-1"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M19 21H10C8.89543 21 8 20.1046 8 19V15H10V19H19V5H10V9H8V5C8 3.89543 8.89543 3 10 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21ZM12 16V13H3V11H12V8L17 12L12 16Z"
                                    fill="currentColor"
                                  ></path>
                                </svg>

                                <span className="mx-1">Sign Out</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center mt-4 md:mt-0">
                        <Link
                          className="flex items-center px-2 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-80"
                          to="/login"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                            />
                          </svg>
                          <span className="mx-1">Login</span>
                        </Link>

                        <div className="relative inline-block">
                          <Link
                            className="flex items-center ml-2 px-2 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-80"
                            to="/register"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                              />
                            </svg>
                            <span className="mx-1">Register</span>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

export default Navbar;
