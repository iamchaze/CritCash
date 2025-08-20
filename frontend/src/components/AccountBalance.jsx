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
      const balance = response.data.balance;

      if (balance === 0 || balance === undefined) {
        setBalance("0.00");
      } else if (response.data.balance) {
        setBalance(balance);
      } else if (response.data.message) {
        setBalance(response.data.message);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-tr from-accent1 to-accent3 border-2 border-accent4 py-7 mx-5 gap-5 rounded-4xl">
      <h2 className="">
        <span className="text-4xl font-[REM] font-semibold">
          {balance}<small className="font-normal">INR</small>
        </span>
      </h2>
      <div className="flex items-center gap-2">
        <div className="text-md font-[REM]">Available Balance </div>
        <img src="/images/eye-solid.svg" className="h-full w-5" alt="eye" />
      </div>
    </div>
  );
};

export default AccountBalance;
