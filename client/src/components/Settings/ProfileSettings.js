import Button from "@material-tailwind/react/Button";
import Image from "@material-tailwind/react/Image";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AlertContext } from "../../contexts/AlertContext";

function ProfileSettings() {
  // States
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [image, setImage] = useState("https://i.ibb.co/3FpLmv3/man.png");

  const token = localStorage.getItem("auth_token");

  // Refs
  const fileInputRef = useRef();

  // Context
  const displayAlert = useContext(AlertContext);

  // Functions
  // Update profile
  const updateProfile = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("avatar", profile.avatar);
    formData.append("user", profile.user);
    formData.append("cf_handle", profile.cf_handle);
    formData.append("university", profile.university);
    formData.append("submission_privacy", profile.submission_privacy);
    formData.append("mentor_list_privacy", profile.mentor_list_privacy);
    formData.append("mentee_list_privacy", profile.mentee_list_privacy);

    console.log(formData.entries());

    fetch(`/user/profile/${profile.id}/`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);

        displayAlert("Profile updated successfully!", true);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);

        displayAlert("Something went wrong!", false);
      });
  };

  // Effects
  useEffect(() => {
    axios
      .get("/auth/users/me/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        axios
          .get(`/user/profile/${res.data.id}`)
          .then((result) => {
            setProfile(result.data);
            setImage(result.data.avatar || "https://i.ibb.co/3FpLmv3/man.png");
          })
          .catch((err) => {
            displayAlert("Some error occured! Try refreshing the page", false);
          });
      })
      .catch((err) => {
        displayAlert("Some error occured! Try refreshing the page.", false);
      });
  }, []);

  return (
    <div>
      <section className="max-w-4xl p-6 bg-white dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          Profile settings
        </h2>

        <div>
          <div className="profileSettingsContainer">
            <div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="firstName"
                  >
                    CF handle
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    value={profile.cf_handle}
                    onChange={(e) =>
                      setProfile({ ...profile, cf_handle: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="emailAddress"
                  >
                    University
                  </label>
                  <input
                    id="emailAddress"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    value={profile.university}
                    onChange={(e) =>
                      setProfile({ ...profile, university: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="my-5">
                <label
                  className="text-gray-700 dark:text-gray-200 mb-5"
                  htmlFor="submissionPrivacy"
                >
                  Submission Privacy
                </label>

                <div>
                  <input
                    id="submissionPrivacyPublic"
                    type="radio"
                    name="submissionPrivacy"
                    value="PUBLIC"
                    className="mr-2"
                    checked={profile.submission_privacy === "PUBLIC"}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        submission_privacy: e.target.value,
                      })
                    }
                  />
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="submissionPrivacyPublic"
                  >
                    Public
                  </label>
                </div>

                <div>
                  <input
                    id="submissionPrivacyPrivate"
                    type="radio"
                    name="submissionPrivacy"
                    value="PRIVATE"
                    className="mr-2"
                    checked={profile.submission_privacy === "PRIVATE"}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        submission_privacy: e.target.value,
                      })
                    }
                  />
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="submissionPrivacyPrivate"
                  >
                    Private
                  </label>
                </div>

                <div>
                  <input
                    id="submissionPrivacyProtected"
                    type="radio"
                    name="submissionPrivacy"
                    value="PROTECTED"
                    className="mr-2 bg-secondary"
                    checked={profile.submission_privacy === "PROTECTED"}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        submission_privacy: e.target.value,
                      })
                    }
                  />
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="submissionPrivacyProtected"
                  >
                    Protected
                  </label>
                </div>
              </div>

              <div className="my-5">
                <label
                  className="text-gray-700 dark:text-gray-200 mb-5"
                  htmlFor="mentorListPrivacy"
                >
                  Mentor List Privacy
                </label>

                <div>
                  <input
                    id="mentorListPrivacyPublic"
                    type="radio"
                    name="mentorListPrivacy"
                    value="PUBLIC"
                    className="mr-2"
                    checked={profile.mentor_list_privacy === "PUBLIC"}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        mentor_list_privacy: e.target.value,
                      })
                    }
                  />
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="mentorListPrivacyPublic"
                  >
                    Public
                  </label>
                </div>

                <div>
                  <input
                    id="mentorListPrivacyPrivate"
                    type="radio"
                    name="mentorListPrivacy"
                    value="PRIVATE"
                    className="mr-2"
                    checked={profile.mentor_list_privacy === "PRIVATE"}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        mentor_list_privacy: e.target.value,
                      })
                    }
                  />
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="mentorListPrivacyPrivate"
                  >
                    Private
                  </label>
                </div>

                <div>
                  <input
                    id="mentorListPrivacyProtected"
                    type="radio"
                    name="mentorListPrivacy"
                    value="PROTECTED"
                    className="mr-2 bg-secondary"
                    checked={profile.mentor_list_privacy === "PROTECTED"}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        mentor_list_privacy: e.target.value,
                      })
                    }
                  />
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="mentorListPrivacyProtected"
                  >
                    Protected
                  </label>
                </div>
              </div>

              <div className="my-5">
                <label
                  className="text-gray-700 dark:text-gray-200 mb-5"
                  htmlFor="menteeListPrivacy"
                >
                  Mentee List Privacy
                </label>

                <div>
                  <input
                    id="menteeListPrivacyPublic"
                    type="radio"
                    name="menteeListPrivacy"
                    value="PUBLIC"
                    className="mr-2"
                    checked={profile.mentee_list_privacy === "PUBLIC"}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        mentee_list_privacy: e.target.value,
                      })
                    }
                  />
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="menteeListPrivacyPublic"
                  >
                    Public
                  </label>
                </div>

                <div>
                  <input
                    id="menteeListPrivacyPrivate"
                    type="radio"
                    name="menteeListPrivacy"
                    value="PRIVATE"
                    className="mr-2"
                    checked={profile.mentee_list_privacy === "PRIVATE"}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        mentee_list_privacy: e.target.value,
                      })
                    }
                  />
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="menteeListPrivacyPrivate"
                  >
                    Private
                  </label>
                </div>

                <div>
                  <input
                    id="menteeListPrivacyProtected"
                    type="radio"
                    name="menteeListPrivacy"
                    value="PROTECTED"
                    className="mr-2 bg-secondary"
                    checked={profile.mentee_list_privacy === "PROTECTED"}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        mentee_list_privacy: e.target.value,
                      })
                    }
                  />
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="menteeListPrivacyProtected"
                  >
                    Protected
                  </label>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-primary rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                  disabled={isLoading}
                  onClick={updateProfile}
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
            </div>
            <div className="ml-5">
              <div>
                <Image
                  src={image}
                  className="w-32 h-32 rounded-full mb-5"
                  rounded={true}
                  raised={true}
                  alt={profile.cf_handle || "user"}
                />
                <span className="bg-primary relative -top-12 left-20">
                  <input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    hidden
                    multiple={false}
                    ref={fileInputRef}
                    onChange={(e) => {
                      console.log("image");
                      const file = e.target.files[0];
                      setProfile({
                        ...profile,
                        avatar: file,
                      });
                      setImage(URL.createObjectURL(file));
                    }}
                  />
                  <label htmlFor="icon-button-file">
                    <Button
                      buttonType="filled"
                      size="regular"
                      rounded={true}
                      block={false}
                      iconOnly={true}
                      ripple="light"
                      className="bg-primary"
                      onClick={() => fileInputRef.current.click()}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                      </svg>
                    </Button>
                  </label>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProfileSettings;
