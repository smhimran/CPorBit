import axios from "axios";
import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { AlertContext } from "../contexts/AlertContext";
import { UserContext } from "../contexts/UserContext";

function Register() {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");

  // Loding and alert states
  const [isLoading, setIsLoading] = useState(false);

  // Contexts
  const user = useContext(UserContext);
  const displayAlert = useContext(AlertContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== "" && password !== conPassword) {
      const message = `Passwords didn't match!`;

      displayAlert(message, false);

      return;
    }

    setIsLoading(true);

    const data = {
      first_name,
      last_name,
      email,
      username,
      password,
    };

    axios
      .post("/auth/users/", data)
      .then((response) => {
        setIsLoading(false);

        const message = `User created successfully!`;

        displayAlert(message, true);
      })
      .catch((error) => {
        setIsLoading(false);

        const response = error.response.data;

        let errorMessage = "";

        for (let key in response) {
          if (errorMessage) {
            errorMessage += "\n";
          }
          errorMessage += `${response[key]}`;
        }

        displayAlert(errorMessage, false);
      });
  };

  if (user.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  } else
    return (
      <div>
        <div className="h-screen register-page py-20 md:py-40">
          <div className="flex max-w-sm m-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800 lg:max-w-5xl">
            <div className="hidden bg-cover lg:block lg:w-1/2 register-bg"></div>

            <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
              <h2 className="text-2xl font-semibold text-center text-primary dark:text-white">
                <Link to="/">
                  CP<i className="text-secondary">or</i>Bit
                </Link>
              </h2>

              <p className="text-xl text-center text-gray-600 dark:text-gray-200">
                Register
              </p>

              <form>
                <div className="mt-4 px-8">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>

                  <input
                    id="firstName"
                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    type="text"
                    value={first_name}
                    onChange={(e) => setFirst_name(e.target.value)}
                    required
                  />
                </div>

                <div className="mt-4 px-8">
                  <label
                    className="block mt-2 mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>

                  <input
                    id="lastName"
                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    type="text"
                    value={last_name}
                    onChange={(e) => setLast_name(e.target.value)}
                    required
                  />
                </div>

                <div className="mt-4 px-8">
                  <label
                    className="block mt-2 mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                    htmlFor="emailAddress"
                  >
                    Email Address
                  </label>

                  <input
                    id="emailAddress"
                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mt-4 px-8">
                  <label
                    className="block mt-2 mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                    htmlFor="username"
                  >
                    Username
                  </label>

                  <input
                    id="username"
                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="mt-4 px-8">
                  <div className="flex justify-between">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                      htmlFor="password"
                    >
                      Password
                    </label>
                  </div>

                  <input
                    id="password"
                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mt-4 px-8">
                  <div className="flex justify-between">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                      htmlFor="conPassword"
                    >
                      Confirm Password
                    </label>
                  </div>

                  <input
                    id="conPassword"
                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    type="password"
                    value={conPassword}
                    onChange={(e) => setConPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mt-8 px-8">
                  {isLoading ? (
                    <div className=" flex justify-center items-center">
                      <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-primary rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                      onClick={handleSubmit}
                    >
                      Register
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                  <Link
                    to="/login"
                    className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                  >
                    Already have an account? Login
                  </Link>

                  <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Register;
