import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const AccountBalance = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      const response = await axios.get("http://localhost:5000/api/v1/accounts/balance", {
        withCredentials: true,
      });
      if(!response.data.balance){
        setBalance(response.data.message)
      } else {
        setBalance(response.data.balance);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div>
      <h2>Account Balance</h2>
      <p>₹{balance}</p>
    </div>
  );
};

export default AccountBalance;
