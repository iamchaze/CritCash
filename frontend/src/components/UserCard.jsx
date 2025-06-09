// components/UserCard.jsx
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const UserCard = ({ user, onClick }) => {
  const navigate = useNavigate();
  // const [buttonState, setButtonState] = useState();

  // useEffect(() => {
  //   const checkFriendRequestStatus = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5000/api/v1/users/checkfriendrequest/${user.id}`,
  //         { withCredentials: true }
  //       );
  //       if (response.data.isFriend) {
  //         setButtonState(false);
  //       } else {
  //         setButtonState(true);
  //       }
  //     } catch (error) {
  //       console.error("Error checking friend request status:", error);
  //     }
  //   };

  //   checkFriendRequestStatus();
  // }, [user.id]);

  // const handleAddFriend = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/api/v1/users/sendfriendrequest",
  //       { friendId: user.id },
  //       { withCredentials: true }
  //     );
  //     console.log("Response from server:", response.data);
  //     if (response.data.message == "request sent") {
  //       alert("Friend request sent successfully!");
  //       setButtonState("pending");
  //     } else {
  //       alert("Failed to send friend request.");
  //       setButtonState("not friends");
  //     }
  //   } catch (error) {
  //     console.error("Error adding friend:", error);
  //     alert("An error occurred while sending the friend request.");
  //   }
  // };

  return (
    <div
      style={{
        cursor: "pointer",
        borderBottom: "1px solid #ccc",
        padding: "10px",
      }}
    >
      <div
        key={user.id}
        onClick={() =>
          navigate(`/profile/${user.username}`, {
            state: { user: user },
          })
        }
      >
        <h3>{`${user.firstName} ${user.lastName}`}</h3>
        <pre>{`${user.contact}     ${user.walletKey}`}</pre>
      </div>
    </div>
  );
};

export default UserCard;
