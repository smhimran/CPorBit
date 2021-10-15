import axios from "axios";
import React, { useState } from "react";

function Register() {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");

  // Loding and alert states
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== "" && password !== conPassword) {
      setAlertMessage(`Passwords didn't match!`);
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
        setAlertMessage("");
      }, 3000);

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
        setIsSuccess(true);
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
          setIsSuccess(false);
        }, 3000);
      })
      .catch((error) => {
        const response = error.response.data;

        let errorMessage = "";

        for (let key in response) {
          if (errorMessage) {
            errorMessage += "\n";
          }
          errorMessage += `${response[key]}`;
        }

        setIsLoading(false);
        setIsSuccess(false);
        setAlertMessage(errorMessage);
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
          setAlertMessage("");
        }, 3000);
      });
  };

  return (
    <div>
      <div className="h-screen register-page py-20 md:py-40">
        <div className="flex max-w-sm m-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800 lg:max-w-5xl">
          <div className="hidden bg-cover lg:block lg:w-1/2 register-bg"></div>

          <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <h2 className="text-2xl font-semibold text-center text-primary dark:text-white">
              CP<i className="text-secondary">or</i>Bit
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

                <a
                  href="/"
                  className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                >
                  or login
                </a>

                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
              </div>
            </form>
          </div>
        </div>

        {/* Alerts */}

        {showAlert && (
          <>
            {isSuccess ? (
              <div className="absolute top-5 right-16">
                <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                  <div className="flex items-center justify-center w-12 bg-green-500">
                    <svg
                      className="w-6 h-6 text-white fill-current"
                      viewBox="0 0 40 40"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
                    </svg>
                  </div>

                  <div className="px-4 py-2 -mx-3">
                    <div className="mx-3">
                      <span className="font-semibold text-green-500 dark:text-green-400">
                        Success
                      </span>
                      <p className="text-sm text-gray-600 dark:text-gray-200">
                        Your account was registered!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="absolute top-5 right-16">
                <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                  <div className="flex items-center justify-center w-12 bg-red-500">
                    <svg
                      className="w-6 h-6 text-white fill-current"
                      viewBox="0 0 40 40"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
                    </svg>
                  </div>

                  <div className="px-4 py-2 -mx-3">
                    <div className="mx-3">
                      <span className="font-semibold text-red-500 dark:text-red-400">
                        Error
                      </span>
                      <p className="text-sm text-gray-600 dark:text-gray-200">
                        {alertMessage}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Register;
