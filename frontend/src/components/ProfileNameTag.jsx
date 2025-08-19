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
          response.data.data.firstName.toUpperCase() +
            " " +
            response.data.data.lastName.toUpperCase()
        );
      }
    };
    setName();
  }, []);
  return (
    <>
      <div className="flex items-center justify-startcursor-pointer gap-4"
        onClick={() => {
          navigate(`/profile/${username}`);
        }}
      >
        <img className="w-10 h-10 object-cover rounded-full" src="/images/person1.jpg" alt="" />
        <p className="font-[REM] font-semibold text-md">{profileNameTag}</p>
      </div>
    </>
  );
};

export default ProfileNameTag;
