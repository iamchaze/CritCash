import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

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
        console.log(response.data);
        setProfileData(response.data.data);
        setConnection(response.data.data.connection);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, [connection]);

  return (
    <div>
      <h1>Profile Page</h1>
      {profileData && (
        <div>
          <div>
            <h2>
              {profileData.firstName} {profileData.lastName}
            </h2>
            <p>Email: {profileData.email}</p>
            <p>Username: {profileData.username}</p>
            <p>Contact: {profileData.contact}</p>
            <p>Wallet Key: {profileData.walletKey}</p>
          </div>
          <div>
            {connection === "notfriend" && (
              <button
                onClick={async () => {
                  try {
                    const response = await axios.post(
                      `http://localhost:5000/api/v1/users/sendfriendrequest`,
                      { username: profileData.username },
                      { withCredentials: true }
                    );
                    console.log(response.data);
                    setConnection("sentrequest");
                  } catch {
                    console.log("Error sending friend request");
                  }
                }}
              >
                Add Friend
              </button>
            )}
            {connection === "friend" && <button>Remove Friend</button>}
            {connection === "sentrequest" && <button>Request Sent</button>}
            {connection === "receivedrequest" && (
              <button>Accept Request</button>
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
