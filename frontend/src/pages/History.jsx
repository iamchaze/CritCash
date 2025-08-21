import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const History = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/accounts/history/",
          {
            withCredentials: true,
          }
        );
        setTransactions(response.data.transactions || []);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("Failed to load transaction history.");
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <>
      <h1>Transaction History</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <div>
          {transactions.map((transaction) => {
            return (
              <div
                style={{ marginBottom: "20px", cursor: "pointer" }}
                key={transaction.id}
                onClick={() =>
                  navigate("/transactiondetails", { state: { transaction } })
                }
              >
                <p>
                  {transaction.type === "sent"
                    ? `Money sent to ${transaction.receiverDetails.firstName} ${transaction.receiverDetails.lastName}`
                    : transaction.type === "received"
                    ? `Money received from ${transaction.senderDetails.firstName} ${transaction.senderDetails.lastName}`
                    : "error"}
                </p>
                <pre>
                  Amount Rs.{transaction.amount} Date:{transaction.date} Time:
                  {transaction.time}
                </pre>
                <hr className="border-0 h-[2px]" />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default History;
