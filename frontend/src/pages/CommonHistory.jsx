import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";


const CommonHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const userId = location.state?.userId;

  useEffect(() => {
    if (!userId) {
      setError("No user details provided.");
      setLoading(false);
      return;
    }
    const fetchCommonHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/accounts/history/${userId}`,
          { withCredentials: true }
        );
        setTransactions(response.data.transactions || []);
      } catch (err) {
        console.error("Error fetching common history:", err);
        setError("Failed to load common history.");
      } finally {
        setLoading(false);
      }
    };

    fetchCommonHistory();
  }, [userId]);

  return (
    <div>
      <h1>Common Transaction History</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              {transaction.type === "sent"
                ? `Sent Rs.${transaction.amount} to ${transaction.receiverDetails.firstName} ${transaction.receiverDetails.lastName}`
                : transaction.type === "received"
                ? `Received Rs.${transaction.amount} from ${transaction.senderDetails.firstName} ${transaction.senderDetails.lastName}`
                : "Unknown transaction type"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CommonHistory;