import axios from "axios";
import React, { useEffect } from "react";

function PastMentors() {
  const [mentors, setMentors] = React.useState([]);

  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    axios
      .get(`/api/user/mentee/get_past_mentors/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setMentors(res.data);
      })
      .catch((err) => console.log(err));

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="dark:bg-gray-800">
        <h1 className="text-center text-3xl text-primary dark:text-gray-200 font-bold p-5">
          Past Mentors
        </h1>
        <div className="w-3/4 mx-auto">
          {mentors.length > 0 ? (
            <div>
              <div>
                <div className="flex flex-col my-5">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-primary text-white">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-4 text-left text-xs font-medium text-gray-200 uppercase tracking-wider w-7/12"
                              >
                                Name
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-4 text-left text-xs font-medium text-gray-200 uppercase tracking-wider w-5/12"
                              >
                                Username
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:text-gray-200">
                            {mentors.map((mentor, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap w-2/12 dark:bg-gray-800">
                                  <div className="text-sm font-medium text-gray-900 dark:text-gray-200">
                                    {mentor.mentor.first_name}{" "}
                                    {mentor.mentor.last_name}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap w-1/12 dark:bg-gray-800">
                                  <div className="text-sm text-gray-900 dark:text-gray-200">
                                    {mentor.mentor.username}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-700 dark:text-gray-200 font-bold text-md m-2 p-2">
              You do not have any past mentor!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PastMentors;
