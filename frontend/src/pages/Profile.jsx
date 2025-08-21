import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import titleCase from "../utils/titlecase";

const Profile = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [connection, setConnection] = useState("");
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/users/profiledetails/${username}`,
          { withCredentials: true }
        );
        setProfileData(response.data.data);
        setConnection(response.data.data.connection);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, [connection]);

  return (
    <div className="font-[REM] bg-gradient-to-br from-accent1 to-accent2 h-screen">
      <div className="bg-button1 p-3 lg:p-5 text-center font-[REM] text-white text-lg lg:text-2xl">
        <h1>Profile</h1>
      </div>
      {profileData && (
        <div>
          <div className="mt-10 mx-auto mb-5">
            <img
              src="/images/person1.jpg"
              className="m-auto rounded-full h-20 w-20 object-cover"
              alt=""
            />
          </div>
          <h2 className="text-2xl text-center font-semibold mb-4">
            {titleCase(profileData.firstName)} {titleCase(profileData.lastName)}
          </h2>
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 w-fit m-auto">
            <span className="font-medium">Username:</span>
            <span>{profileData.username}</span>

            <span className="font-medium">Wallet Key:</span>
            <span>{profileData.walletKey}</span>

            <span className="font-medium">Email:</span>
            <span className="break-all">{profileData.email}</span>

            <span className="font-medium">Contact:</span>
            <span>{profileData.contact}</span>
          </div>

          <div className="w-fit m-auto my-5">
            {connection === "notfriend" && (
              <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={async () => {
                  try {
                    const response = await axios.post(
                      `http://localhost:5000/api/v1/users/sendfriendrequest`,
                      { username: profileData.username },
                      { withCredentials: true }
                    );
                    console.log(response.data.message);
                    setConnection("sentrequest");
                  } catch {
                    console.log("Error sending friend request");
                  }
                }}
              >
                Add Friend
              </button>
            )}
            {connection === "sentrequest" && (
              <button
              className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={async () => {
                  try {
                    const response = await axios.post(
                      `http://localhost:5000/api/v1/users/cancelfriendrequest`,
                      { username: profileData.username },
                      { withCredentials: true }
                    );
                    console.log(response.data.message);
                    setConnection("notfriend");
                  } catch {
                    console.log("Error cancelling friend request");
                  }
                }}
              >
                Cancel Request
              </button>
            )}
            {connection === "receivedrequest" && (
              <button
              className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={async () => {
                  try {
                    const response = await axios.post(
                      `http://localhost:5000/api/v1/users/acceptfriendrequest`,
                      { username: profileData.username },
                      { withCredentials: true }
                    );
                    console.log(response.data.message);
                    setConnection("friend");
                  } catch {
                    console.log("Error accepting friend request");
                  }
                }}
              >
                Accept Request
              </button>
            )}
            {connection === "friend" && (
              <button
              className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={async () => {
                  try {
                    const response = await axios.post(
                      "http://localhost:5000/api/v1/users/removefriend",
                      { username: profileData.username },
                      { withCredentials: true }
                    );
                    console.log(response.data);
                    setConnection("notfriend");
                  } catch {
                    console.log("Error removing friend");
                  }
                }}
              >
                Remove Friend
              </button>
            )}
            {connection === "" && (
              <button onClick={navigate("/dashboard", { replace: true })}>
                Unknown Action
              </button>
            )}
          </div>
        </div>
      )}
      {!profileData && <p>Loading profile data...</p>}
    </div>
  );
};

export default Profile;
