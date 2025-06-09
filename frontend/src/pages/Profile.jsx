import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const Profile = () => {
  const { username } = useParams();
  console.log(username);
  const [profileData, setProfileData] = useState(null);
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/users/profiledetails/${username}`,
          { withCredentials: true }
        );
        setProfileData(response.data.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      {profileData && (
        <div>
          <h2>
            {profileData.firstName} {profileData.lastName}
          </h2>
          <p>Email: {profileData.email}</p>
          <p>Username: {profileData.username}</p>
          <p>Contact: {profileData.contact}</p>
          <p>Wallet Key: {profileData.walletKey}</p>
        </div>
      )}
      {!profileData && <p>Loading profile data...</p>}
    </div>
  );
};

export default Profile;
