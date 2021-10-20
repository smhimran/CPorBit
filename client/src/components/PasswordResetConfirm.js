import axios from "axios";
import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { AlertContext } from "../contexts/AlertContext";

function PasswordResetConfirm() {
  const [new_password, setNew_password] = useState("");
  const [confirmNew_password, setConfirmNew_password] = useState("");

  // Loading and alert states
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Contexts
  const displayAlert = useContext(AlertContext);

  // url params
  const { uid, token } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (new_password !== "" && new_password !== confirmNew_password) {
      displayAlert(`Passwords didn't match!`, false);

      return;
    }

    const data = {
      uid,
      token,
      new_password,
    };

    setIsLoading(true);

    axios
      .post("/auth/users/reset_password_confirm/", data)
      .then((response) => {
        setIsLoading(false);
        setIsLoaded(true);

        displayAlert(
          "Password updated! You can now login using new password",
          true
        );
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm text-gray-800 dark:text-gray-200"
                >
                  New Password
                </label>
              </div>

              <input
                type="password"
                value={new_password}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                required
                onChange={(e) => setNew_password(e.target.value)}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mt-2">
                <label
                  htmlFor="password"
                  className="block text-sm text-gray-800 dark:text-gray-200"
                >
                  Confirm New Password
                </label>
              </div>

              <input
                type="password"
                value={confirmNew_password}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                required
                onChange={(e) => setConfirmNew_password(e.target.value)}
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

export default PasswordResetConfirm;
