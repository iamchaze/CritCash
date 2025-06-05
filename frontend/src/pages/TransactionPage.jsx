import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TransactionPage = () => {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [requestAmount, setRequestAmount] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const task = location.state?.task;
  const user = location.state?.user;
  useEffect(() => {
    if (task === "acceptpaymentrequest" && user) {
      setRequestAmount(user.requestAmount);
    }
  }, [task, user]);
  return (
    <>
      <h2>
        {user
          ? `${
              task === "sendmoney" || task === "acceptpaymentrequest"
                ? "Send Money to"
                : task === "requestmoney"
                ? "Request Money from"
                : "Unknown Transaction"
            } ${user.firstName} ${user.lastName}`
          : "Unknown Transaction"}
      </h2>

      <div>
        <input
          type="number"
          placeholder="Enter Amount"
          id="amount"
          name="amount"
          value={requestAmount ?? amount}
          disabled={requestAmount !== null}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
      </div>
      <button>Split With Mates</button>
      <div>
        <input
          type="text"
          placeholder="Add Note"
          value={task === "acceptpaymentrequest" ? user.requestNote : note}
          disabled={task === "acceptpaymentrequest"}
          onChange={(e) => {
            setNote(e.target.value);
          }}
        />
      </div>
      <button
        onClick={async () => {
          const response = await axios.post(
            `http://localhost:5000/api/v1/transactions/${
              task === `acceptpaymentrequest`
                ? `sendmoney?query=acceptpaymentrequest`
                : task
            }`,
            {
              to: user,
              amount: task === "acceptpaymentrequest" ? requestAmount : amount,
              note: note !== "" ? note : null,
            },
            { withCredentials: true }
          );
          if (response.data.message == "Payment request sent") {
            alert("Payment request sent");
            navigate("/dashboard", { replace: true });
          } else if (response.data.message == "Money transferred") {
            alert("Money transferred");
            navigate("/dashboard", { replace: true });
          } else {
            alert(response.data.message);
          }
        }}
      >
        {task === "sendmoney" || task === "acceptpaymentrequest"
          ? `Send Money`
          : task === "requestmoney"
          ? `Request Money`
          : `Unknown Transaction`}
      </button>
    </>
  );
};

export default TransactionPage;
