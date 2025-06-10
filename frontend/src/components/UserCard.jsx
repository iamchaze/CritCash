// components/UserCard.jsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";

const UserCard = ({ user, onClick, task }) => {
  const navigate = useNavigate();
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
        onClick={
          task === "sendmoney" || task === "requestmoney"
            ? () => onClick(user)
            : () =>
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
