import React from "react";
import { useState, useEffect } from "react";
import axios from "../utils/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProfileNameTag = () => {
  const [profileNameTag, setProfileNameTag] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const setName = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/getuserdetails/?fields=firstName,lastName,username`,
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
      <div className="flex items-center justify-start cursor-pointer gap-4 lg:bg-accent1 p-2 rounded-lg lg:shadow-lg lg:hover:shadow-xl transition-shadow duration-300 active:translate-0.5 transition-all"
        onClick={() => {
          navigate(`/profile/${username}`);
        }}
      >
        <img className="w-10 h-10 object-cover rounded-full border-2 border-accent4" src="/images/person1.jpg" alt="" />
        <p className="font-[REM] font-semibold text-md">{profileNameTag}</p>
      </div>
    </>
  );
};

export default ProfileNameTag;
