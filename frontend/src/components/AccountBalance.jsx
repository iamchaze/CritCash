import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const AccountBalance = () => {
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    const fetchBalance = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/v1/accounts/balance",
        {
          withCredentials: true,
        }
      );
      const balance = parseFloat(response.data.balance);
      if (balance === 0) {
        setBalance("0.00");
      } else if (response.data.balance) {
        setBalance(balance.toFixed(2));
      } else if (response.data.message) {
        setBalance(response.data.message);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div>
      <h2>Account Balance: ₹{balance}</h2>
    </div>
  );
};

export default AccountBalance;
