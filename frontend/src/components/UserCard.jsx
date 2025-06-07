// components/UserCard.jsx
import React from "react";
import axios from "axios";

const UserCard = ({ user, onClick }) => {
  const handleAddFriend = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/addfriend",
        { friendId: user.id },
        { withCredentials: true }
      );
      if (response.data.success) {
        alert("Friend request sent successfully!");
      } else {
        alert("Failed to send friend request.");
      }
    } catch (error) {
      console.error("Error adding friend:", error);
      alert("An error occurred while sending the friend request.");
    }
  };
  return (
    <div
      style={{
        cursor: "pointer",
        borderBottom: "1px solid #ccc",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div key={user.id} onClick={() => onClick(user)}>
        <h3>{`${user.firstName} ${user.lastName}`}</h3>
        <pre>{`${user.contact}     ${user.walletKey}`}</pre>
      </div>
      <button onClick={handleAddFriend}>Add Friend</button>
    </div>
  );
};

export default UserCard;
