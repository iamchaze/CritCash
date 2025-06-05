import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Deposit = () => {
  const [paymentMethod, setPaymentMethod] = useState("debit");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <h1>Deposit Page</h1>
      <p>This is a simulation, please don't enter your actual bank details!</p>

      <div>
        <label htmlFor="method">Payment Method:</label>
        <select
          name="Payment Method"
          id="method"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="debit">Debit Card</option>
          <option value="credit">Credit Card</option>
          <option value="bank">Bank Transfer</option>
          <option value="paypal">PayPal</option>
          <option value="crypto">Cryptocurrency</option>
          <option value="upi">UPI</option>
        </select>
      </div>

      <div style={{ marginTop: "20px" }}>
        {paymentMethod === "debit" && (
          <>
            <h2>Debit Card Details</h2>
            <input type="text" placeholder="Card Number" />
            <br />
            <input type="text" placeholder="Expiry Date (MM/YY)" />
            <br />
            <input type="text" placeholder="CVV" />
            <br />
            <input
              type="number"
              placeholder="Amount"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </>
        )}

        {paymentMethod === "credit" && (
          <>
            <h2>Credit Card Details</h2>
            <input type="text" placeholder="Card Number" />
            <br />
            <input type="text" placeholder="Expiry Date (MM/YY)" />
            <br />
            <input type="text" placeholder="CVV" />
            <br />
            <input
              type="number"
              placeholder="Amount"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </>
        )}

        {paymentMethod === "bank" && (
          <>
            <h2>Bank Transfer Details</h2>
            <input type="text" placeholder="Account Number" />
            <br />
            <input type="text" placeholder="IFSC Code" />
            <br />
            <input type="text" placeholder="Account Holder Name" />
            <br />
            <input
              type="number"
              placeholder="Amount"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </>
        )}

        {paymentMethod === "paypal" && (
          <>
            <h2>PayPal Details</h2>
            <input type="email" placeholder="PayPal Email" />
            <br />
            <input
              type="number"
              placeholder="Amount"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </>
        )}

        {paymentMethod === "crypto" && (
          <>
            <h2>Crypto Payment</h2>
            <input type="text" placeholder="Wallet Address" />
            <br />
            <input type="text" placeholder="Crypto Type (BTC/ETH)" />
            <br />
            <input
              type="number"
              placeholder="Amount"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </>
        )}

        {paymentMethod === "upi" && (
          <>
            <h2>UPI Payment</h2>
            <input type="text" placeholder="UPI ID (e.g., name@bank)" />
            <br />
            <input
              type="number"
              placeholder="Amount"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </>
        )}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={async () => {
            const response = await axios.put(`http://localhost:5000/api/v1/accounts/deposit`, {
                amount: amount
            }, {
                withCredentials: true,
            })
            if(response.data.message !== "successful"){
                alert(response.data.message); 
            } else {
                alert("Deposit successful!");
                navigate("/dashboard");
            }
        }}>Deposit</button>
      </div>
    </div>
  );
};

export default Deposit;
