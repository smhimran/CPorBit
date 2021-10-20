import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AlertContext } from "../contexts/AlertContext";

function PasswordReset() {
  const [email, setEmail] = useState("");

  // Loading and alert states
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Contexts
  const displayAlert = useContext(AlertContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email,
    };

    setIsLoading(true);

    axios
      .post("/auth/users/reset_password/", data)
      .then((reponse) => {
        setIsLoading(false);
        setIsLoaded(true);

        displayAlert(
          `You'll recieve an email if an account with that email exists!`,
          true
        );
      })
      .catch((error) => {
        setIsLoading(false);

        displayAlert("Some error happened! Please try again later..", false);
      });
  };

  return (
    <div>
      <div className="login-page h-screen py-20 md:py-60">
        <div className="w-full max-w-sm px-6 py-12 md:px-8 m-auto bg-white rounded-md shadow-md dark:bg-gray-800">
          <h1 className="text-3xl font-semibold text-center text-primary dark:text-white">
            <Link to="/">
              CP<i className="text-secondary">or</i>Bit
            </Link>
          </h1>

          <p className="text-xl text-center text-gray-600 dark:text-gray-200">
            Reset Password
          </p>

          <form className="mt-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-800 dark:text-gray-200"
              >
                Enter you email
              </label>
              <input
                type="email"
                value={email}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mt-6">
              {isLoading ? (
                <div className=" flex justify-center items-center">
                  <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <>
                  {!isLoaded && (
                    <button
                      className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-primary rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  )}
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
