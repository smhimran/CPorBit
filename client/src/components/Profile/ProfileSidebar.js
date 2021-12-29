import { Card, Image } from "@material-tailwind/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import ProfileConnections from "./ProfileConnections";
import ProfileScore from "./ProfileScore";

function ProfileSidebar(props) {
  const [profile, setProfile] = useState({});
  const [name, setName] = useState("");
  const [isConnected, setIsConnected] = useState("");

  const { username } = useParams();

  const user = useContext(UserContext);

  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    axios
      .get(`/api/user/profile/?username=${username}`)
      .then((res) => {
        setProfile(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`/api/user/${username}/`)
      .then((res) => {
        setName(res.data.first_name + " " + res.data.last_name);
      })
      .catch((err) => {
        console.log(err);
      });

    if (user.isAuthenticated) {
      axios
        .get(
          `/api/user/mentee/is_connection_or_requested/?username=${username}`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        .then((res) => {
          setIsConnected(res.data.status);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div>
        <div>
          <Card className="dark:bg-gray-800 py-8 shadow-xl">
            <Image
              src={profile.avatar || "https://i.ibb.co/3FpLmv3/man.png"}
              alt={username}
              className="mx-auto mb-4 w-56 h-56"
              rounded={true}
              raised={true}
            />
            <div className="my-2">
              <h2 className="text-center text-2xl font-bold dark:text-gray-200">
                {name}
              </h2>
              <h3 className="text-center text-xl dark:text-gray-200">
                {profile.university}
              </h3>
              <h4 className="text-center text-lg text-secondary">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                  href={`http://codeforces.com/profile/${profile.cf_handle}`}
                >
                  {profile.cf_handle}
                </a>
              </h4>
            </div>

            <ProfileScore />

            {!(user.isAuthenticated && user.user === username) && (
              <ProfileConnections
                username={username}
                isConnected={isConnected}
                setIsConnected={setIsConnected}
              />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ProfileSidebar;
