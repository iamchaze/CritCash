import React, { useState } from "react";
import axios from "axios";

const AccountBalance = () => {
  const [balance, setBalance] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchBalance = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        "http://localhost:5000/api/v1/accounts/balance",
        { withCredentials: true }
      );

      setBalance(data?.balance ?? 0);
      setIsVisible(true);
    } catch (err) {
      setBalance("Error - ", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleBalance = () => {
    if (!isVisible && balance === null) {
      fetchBalance();
    } else {
      setIsVisible(!isVisible);
    }
  };

  const displayBalance = isVisible
    ? `${balance.toFixed?.(2) ?? balance}`
    : "*****";

  return (
    <div className="w-auto flex flex-col items-center justify-center bg-gradient-to-tr from-accent1 to-accent3 border-2 border-accent4 py-7 mx-5 gap-5 rounded-4xl h-full">
      <h2>
        <span className="text-3xl font-[REM] font-semibold">
          {loading ? "Loading..." : displayBalance}
          <small className="font-normal"> INR</small>
        </span>
      </h2>

      <div className="flex items-center gap-2">
        <span className="text-md font-[REM]">Available Balance</span>

        <img
          src={
            isVisible
              ? "/images/eye-slash-regular.svg"
              : "/images/eye-solid.svg"
          }
          alt="toggle balance"
          onClick={toggleBalance}
          className="w-5 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default AccountBalance;
