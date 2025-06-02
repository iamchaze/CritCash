import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TransactionDetails = () => {
  const location = useLocation();
  const transaction = location.state?.transaction;
  const navigate = useNavigate();
  if (!transaction) {
    return <p>No transaction details available.</p>;
  }

  return (
    <div>
      <h1>Transaction Details</h1>
      <p>
        {transaction.type === "sent"
          ? `Money sent to ${transaction.receiverDetails.firstName} ${transaction.receiverDetails.lastName}`
          : transaction.type === "received"
          ? `Money received from ${transaction.senderDetails.firstName} ${transaction.senderDetails.lastName}`
          : "error"}
      </p>
      <pre>
        Amount: Rs. {transaction.amount} <br />
        Date: {transaction.date} <br />
        Time: {transaction.time} <br />
        Status: {transaction.status} <br />
        {transaction.note
          ? `Note: ${transaction.note}`
          : "No note provided"}{" "}
        <br />
        {transaction.type === "sent"
          ? `Receiver ID: ${transaction.receiverUserId}
          Receiver Username: ${transaction.receiverDetails.username}`
          : transaction.type === "received"
          ? `Sender ID: ${transaction.senderUserId}
          Sender Username: ${transaction.senderDetails.username}`
          : ""}
      </pre>
      <button
        onClick={() =>
          navigate("/commonhistory", {
            state: {
              userId:
                transaction.type === "sent"
                  ? transaction.receiverUserId
                  : transaction.type === "received"
                  ? transaction.senderUserId
                  : null
            },
          })
        }
      >
        See Transaction History with
        {transaction.type === "sent"
          ? ` ${transaction.receiverDetails.firstName}`
          : transaction.type === "received"
          ? ` ${transaction.senderDetails.firstName}`
          : ` unknown`}
      </button>
    </div>
  );
};

export default TransactionDetails;
