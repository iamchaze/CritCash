import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProfileNameTag = () => {
  const [profileNameTag, setProfileNameTag] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const setName = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/v1/users/getuserdetails/?fields=firstName,lastName,username`,
        { withCredentials: true }
      );
      if (response.data.message) {
        setProfileNameTag(response.data.message);
      } else {
        setUsername(response.data.data.username);
        setProfileNameTag(
          response.data.data.firstName + " " + response.data.data.lastName
        );
      }
    };
    setName();
  }, []);
  return (
    <>
      <div
        onClick={() => {
          navigate(`/profile/${username}`);
        }}
      >
        {profileNameTag}
      </div>
    </>
  );
};

export default ProfileNameTag;
