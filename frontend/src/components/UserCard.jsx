// components/UserCard.jsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import titleCase from "../utils/titleCase";

const UserCard = ({ user, onClick, task }) => {
  const navigate = useNavigate();
  return (
    <div className=" cursor-pointer p-2 bg-gray-100">
      <div
        className="font-[REM] text-lg bg-accent6 py-3 px-5 rounded-2xl"
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
        <div className="flex flex-row justify-between">
          <div className="text-lg font-bold">
            {`${titleCase(user.firstName)} ${titleCase(user.lastName)}`}
          </div>
          <div className="text-md">Wallet Key: {`${user.walletKey}`}</div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
