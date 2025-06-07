import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProfileNameTag = () => {
  const [profileNameTag, setProfileNameTag] = useState("");

  useEffect(() => {
    const setName = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/v1/users/getuserdetails?fields=firstName,lastName",
        { withCredentials: true },        
      );
      if (response.data.message) {
        setProfileNameTag(response.data.message);
      } else {
        setProfileNameTag(
          response.data.data.firstName + " " + response.data.data.lastName
        );
      }
    };
    setName();
  }, []);
  return (
    <>
      <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
        {profileNameTag}
      </Link>
    </>
  );
};

export default ProfileNameTag;
