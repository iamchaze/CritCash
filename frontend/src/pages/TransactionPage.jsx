import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const TransactionPage = () => {
  const [amount, setAmount] = useState(0);

  const location = useLocation();
  const task = location.state?.task;
  const user = location.state?.user;
  return (
    <>
      <h2>
        {user
          ? `${
              task === "send"
                ? "Send Money to"
                : task === "request"
                ? "Request Money from"
                : "Unknown Transaction"
            } ${user.firstName} ${user.lastName}`
          : "Unknown Transaction"}
      </h2>

      <div>
        <input
          type="text"
          placeholder="Enter Amount"
          id="amount"
          name="amount"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
      </div>
      <button>Split With Mates</button>
      <div>
        <input type="text" placeholder="Add Note" />
      </div>
      <button
        onClick={async () => {
          const response = await axios.post(
            `http://localhost:5000/api/v1/accounts/transfer`,
            { currentUser: user, amount: amount },
            { withCredentials: true }
          );
        }}
      >
        {task === "send"
          ? `Send Money`
          : task === "request"
          ? `Request Money`
          : `Unknown Transaction`}
      </button>
    </>
  );
};

export default TransactionPage;
