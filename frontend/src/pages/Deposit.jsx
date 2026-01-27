import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";
import DesktopSideBar from "../components/DesktopSideBar";

const Deposit = () => {
  const [paymentMethod, setPaymentMethod] = useState("debit");
  const [amount, setAmount] = useState("");
  const [otp, setOtp] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardHolderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const navigate = useNavigate();

  const handleCardDetailChange = (e) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value,
    });
  };

  const requestOtp = async () => {
    try {
      alert(
        "OTP requested. Please check your registered mobile number or email.",
      );
    } catch (error) {
      console.error("OTP request failed:", error);
      alert("Failed to send OTP. Please try again.");
    }
  };

  const handleDeposit = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    if (
      (paymentMethod === "debit" || paymentMethod === "credit") &&
      (!cardDetails.cardHolderName ||
        !cardDetails.cardNumber ||
        !cardDetails.expiryDate ||
        !cardDetails.cvv ||
        !otp)
    ) {
      alert("Please fill in all details including the OTP.");
      return;
    }

    try {
      const payload = {
        amount: Number(amount),
        paymentMethod: paymentMethod,
        ...(paymentMethod === "debit" || paymentMethod === "credit"
          ? {
              otp: otp,
              cardNumberLast4: cardDetails.cardNumber.slice(-4),
            }
          : {}),
      };

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/accounts/deposit`,
        payload,
        {
          withCredentials: true,
        },
      );

      if (response.data.message !== "successful") {
        alert(response.data.message);
      } else {
        alert("Deposit successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Deposit error:", error);
      alert("An error occurred during deposit.");
    }
  };

  const StyledInput = ({
    placeholder,
    type = "text",
    name,
    value,
    onChange,
    className = "",
    required = true,
  }) => (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full lg:w-fit lg:flex lg:flex-row lg:justify-around p-3 lg:pr-10 my-2 text-sm text-gray-700 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-gray-400 ${className}`}
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05) inset" }}
    />
  );

  // Helper function to render the card details input group
  const CardDetailsInputs = () => (
    <>
      <StyledInput
        placeholder="Enter Card Holder's Name"
        name="cardHolderName"
        value={cardDetails.cardHolderName}
        onChange={handleCardDetailChange}
      />
      <StyledInput
        placeholder="Enter Card Number"
        name="cardNumber"
        type="tel"
        value={cardDetails.cardNumber}
        onChange={handleCardDetailChange}
      />
      <div className="flex space-x-2 my-2">
        <StyledInput
          placeholder="Expiry Date (MM/YY)"
          name="expiryDate"
          value={cardDetails.expiryDate}
          onChange={handleCardDetailChange}
          className="w-1/2"
        />
        <StyledInput
          placeholder="CVV"
          name="cvv"
          type="password"
          value={cardDetails.cvv}
          onChange={handleCardDetailChange}
          className="w-1/2"
        />
      </div>
      <StyledInput
        placeholder="Enter Amount"
        name="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      {/* Updated: Button now calls requestOtp() */}
      <button
        onClick={requestOtp}
        className="w-full lg:w-fit lg:px-5 lg:block py-3 mt-4 text-white font-semibold  rounded-lg shadow-lg bg-button1 hover:bg-button1light cursor-pointer transition duration-150"
      >
        Generate OTP
      </button>

      <StyledInput
        placeholder="Enter OTP"
        name="otp"
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="mt-4"
      />
    </>
  );

  // Helper function to render the alternative payment method details
  const OtherPaymentDetails = () => {
    // ... (Rest of the OtherPaymentDetails function remains the same as before)
    switch (paymentMethod) {
      case "bank":
        return (
          <>
            <h2 className="text-lg font-semibold text-gray-800 my-4">
              Bank Transfer Details
            </h2>
            <StyledInput placeholder="Account Number" name="accountNumber" />
            <StyledInput placeholder="IFSC Code" name="ifscCode" />
            <StyledInput
              placeholder="Account Holder Name"
              name="bankHolderName"
            />
          </>
        );
      case "paypal":
        return (
          <>
            <h2 className="text-lg font-semibold text-gray-800 my-4">
              PayPal Details
            </h2>
            <StyledInput
              placeholder="PayPal Email"
              name="paypalEmail"
              type="email"
            />
          </>
        );
      case "crypto":
        return (
          <>
            <h2 className="text-lg font-semibold text-gray-800 my-4">
              Crypto Payment
            </h2>
            <StyledInput placeholder="Wallet Address" name="walletAddress" />
            <StyledInput
              placeholder="Crypto Type (BTC/ETH)"
              name="cryptoType"
            />
          </>
        );
      case "upi":
        return (
          <>
            <h2 className="text-lg font-semibold text-gray-800 my-4">
              UPI Payment
            </h2>
            <StyledInput placeholder="UPI ID (e.g., name@bank)" name="upiId" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="lg:flex h-screen">
        <DesktopSideBar />

        <div className="w-full h-full rounded-xl lg:rounded-none shadow-2xl overflow-hidden border border-gray-100">
          <div className=" bg-accent2 text-center p-5 lg:p-7 text-2xl lg:text-3xl font-bold font-[REM] relative">
            <button
              className="lg:hidden w-7 h-7 absolute left-5 top-1/2 -translate-y-1/2 hover:cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <img
                src="/images/arrow-left-solid.svg"
                alt="Back"
                className="w-full h-full"
              />
            </button>
            <h1>Deposit</h1>
          </div>
          <header className="flex justify-between items-center px-4 py-3 bg-accent6">
            <h1 className="text-lg font-semibold text-gray-800">Add money</h1>
          </header>

          <div className="p-4">
            <div className="mb-6">
              <select
                name="Payment Method"
                id="method"
                value={paymentMethod}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                  setAmount("");
                  setOtp("");
                  setCardDetails({
                    cardHolderName: "",
                    cardNumber: "",
                    expiryDate: "",
                    cvv: "",
                  });
                }}
                className="w-full  lg:w-fit p-2.5 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 appearance-none"
                style={{
                  background: `url('data:image/svg+xml;charset=US-ASCII,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%22292.4%22 height%3D%22292.4%22%3E%3Cpath fill%3D%22%23111827%22 d%3D%22M287 69.4a17.6 17.6 0 0 0-13-5.4H18.4c-5 0-9.3 1.8-13 5.4C1.8 73 0 77.3 0 82.3c0 5 1.8 9.3 5.4 13l135.2 135.2c3.7 3.7 8 5.6 13 5.6s9.3-1.8 13-5.4l135.2-135.2c3.6-3.7 5.4-8 5.4-13.1.1-5-1.7-9.4-5.3-13z%22%2F%3E%3C%2Fsvg%3E') no-repeat right 0.75rem center/10px 10px`,
                  paddingRight: "2.5rem",
                }}
              >
                {/* <option value="debit">Debit Card</option>
                <option value="credit">Credit Card</option> */}
                <option value="bank">Bank Transfer</option>
                <option value="paypal">PayPal</option>
                <option value="crypto">Cryptocurrency</option>
                <option value="upi">UPI</option>
              </select>
            </div>

            {paymentMethod === "debit" || paymentMethod === "credit" ? (
              <CardDetailsInputs />
            ) : (
              <>
                {OtherPaymentDetails()}
                <StyledInput
                  placeholder="Enter Amount"
                  name="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="my-4"
                />

                <button
                  onClick={handleDeposit}
                  className="w-full py-4 mt-6 text-xl text-white font-bold rounded-lg shadow-xl bg-button1 hover:bg-button1light cursor-pointer transition duration-150"
                >
                  Add Money
                </button>
              </>
            )}

            {(paymentMethod === "debit" || paymentMethod === "credit") && (
              <button
                onClick={handleDeposit}
                className="w-full py-4 mt-6 text-xl text-white font-bold rounded-lg shadow-xl bg-button1 hover:bg-button1light cursor-pointer transition duration-150"
              >
                Add Money
              </button>
            )}

            <p className="mt-8 text-xs text-center text-red-500 p-2 border border-red-200 rounded-lg bg-red-50">
              **SIMULATION NOTICE:** Please do not enter actual bank details.
              This is a frontend demo.
            </p>
          </div>

          <div className="absolute bottom-0 w-full lg:hidden">
            <div className="bg-button1 hover:bg-button1light w-full h-16 flex justify-center items-center rounded-b-xl">
              <button
                onClick={() => navigate("/dashboard")}
                className="flex flex-col items-center text-white p-2"
              >
                <span className="text-xs font-medium ">Home</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Deposit;
