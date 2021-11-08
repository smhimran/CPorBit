import axios from "axios";
import React, { useContext, useState } from "react";
import { AlertContext } from "../../contexts/AlertContext";

function UpdatePassword() {
  // States
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("auth_token");

  // Context
  const displayAlert = useContext(AlertContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (newPassword !== confirmPassword) {
      displayAlert("Passwords do not match", false);
      setIsLoading(false);
      return;
    }

    const data = {
      new_password: newPassword,
      current_password: currentPassword,
    };

    axios
      .post("/auth/users/set_password/", data, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        displayAlert("Password updated successfully", true);
        setIsLoading(false);
      })
      .catch((err) => {
        displayAlert(
          "Some error occured. Try again using correct passwords",
          false
        );
        setIsLoading(false);
      });
  };

  return (
    <div>
      <div>
        <label className="text-gray-700 dark:text-gray-200" htmlFor="password">
          Current Password
        </label>
        <input
          id="password"
          type="password"
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
        <div>
          <label
            className="text-gray-700 dark:text-gray-200"
            htmlFor="password"
          >
            New Password
          </label>
          <input
            id="password"
            type="password"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div>
          <label
            className="text-gray-700 dark:text-gray-200"
            htmlFor="passwordConfirmation"
          >
            Password Confirmation
          </label>
          <input
            id="passwordConfirmation"
            type="password"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <button
          className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-primary rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? (
            <div className=" flex justify-center items-center">
              <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : (
            "Update Password"
          )}
        </button>
      </div>
    </div>
  );
}

export default UpdatePassword;
