import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AlertContext } from "../contexts/AlertContext";

function ActivateAccount() {
  const [isLoading, setIsLoading] = useState(false);

  // url params
  const { uid, token } = useParams();

  // Contexts
  const displayAlert = useContext(AlertContext);

  useEffect(() => {
    setIsLoading(true);

    const data = {
      uid,
      token,
    };

    axios
      .post("/auth/users/activation/", data)
      .then((response) => {
        setIsLoading(false);

        displayAlert("Your account was activated!", true);
      })
      .catch((error) => {
        setIsLoading(false);

        displayAlert("Some error occured! Try again later...", false);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="py-5 px-3">
      <h1 className="text-5xl">
        Please wait while your account is activated...
      </h1>

      {isLoading && (
        <div className=" flex justify-center items-center my-8 py-2">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Alerts

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
                      Some error occured! Try again later...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )} */}
    </div>
  );
}

export default ActivateAccount;
