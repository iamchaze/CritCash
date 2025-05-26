import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaymentRequests = () => {
  const [requests, setRequests] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/accounts/paymentrequests",
          { withCredentials: true }
        );
        if (response.data.message === "No payment requests found" || response.data.pendingRequests.length === 0) {
          setRequests("No payment requests");
        }
        if (response.data.pendingRequests?.length > 0) {
          console.log(response.data.pendingRequests);
          setRequests(response.data.pendingRequests);
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
      {requests === "No payment requests" || !requests ? (
        <p>No Payment Requests</p>
      ) : (
        <ul>
          {requests.map((request) => (
            <li key={request._id}>
              <p>
                From: {request.requestSenderDetails.firstName}{" "}
                {request.requestSenderDetails.lastName}
              </p>
              <p>Amount: Rs.{request.requestAmount}</p>
              <p>Status: {request.requestStatus}</p>
              <p>Date: {request.requestDate}</p>
              <p>Time: {request.requestTime}</p>
              <p>Note: {request.requestNote}</p>
              <button
                onClick={async () => {
                  const user = {
                    requestId: request._id,
                    id: request.requestSenderDetails.id,
                    firstName: request.requestSenderDetails.firstName,
                    lastName: request.requestSenderDetails.lastName,
                    username: request.requestSenderDetails.username,
                    requestAmount: request.requestAmount,
                    requestNote: request.requestNote,
                  };
                  navigate("/transaction", {
                    state: { task: "acceptpaymentrequest", user: user },
                  });
                }}
              >
                Pay
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PaymentRequests;
