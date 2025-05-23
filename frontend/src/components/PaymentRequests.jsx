import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaymentRequests = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/accounts/paymentrequests",
          { withCredentials: true }
        );
        if(response.data.message === 'No payment requests found') {
          setRequests('No payment requests');
        }
        if(response.data.paymentRequests) {
          setRequests(response.data.paymentRequests);
        }
      } catch (error) {
        console.error("Error fetching payment requests:", error);
      }
    };
    fetchRequests();
  }, []);
  return (
    <div>
      <h1>Payment Requests</h1>
      {requests === 'No payment requests' ? (<p>No Payment Requests</p>): (
        <ul>
          {requests.map((request) => (
            <li key={request._id}>
              <p>From: {request.requestSenderId}</p>
              <p>Amount: {request.requestAmount / 100}</p>
              <p>Status: {request.requestStatus}</p>
              <p>Date: {request.requestDate}</p>
              <p>Time: {request.requestTime}</p>
              <p>Note: {request.requestNote}</p>
              <button onClick={async () => {
                navigate("/transaction", {state: { task: "acceptPaymentRequest", user: request.requestSenderId } });
              }}>Pay</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PaymentRequests;
