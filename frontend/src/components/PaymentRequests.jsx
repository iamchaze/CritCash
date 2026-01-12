import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import titleCase from "../utils/titlecase";
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
        if (
          response.data.message === "No payment requests found" ||
          response.data.pendingRequests.length === 0
        ) {
          setRequests("No payment requests");
        }
        if (response.data.pendingRequests?.length > 0) {
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
      <h1 className="font-[REM] font-bold text-md px-2">Payment Requests</h1>
      {requests === "No payment requests" || !requests ? (
        <p className="text-center p-5 font-[REM]">No Payment Requests</p>
      ) : (
        <ul>
          {requests.map((request) => (
            <li
              key={request._id}
              className="m-2 p-5 rounded-lg bg-accent2 font-[REM] text-md"
            >
              <div
                key={request._id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center justify-start gap-3">
                  <img
                    src="/images/person1.jpg"
                    className="h-10 w-10 object-cover rounded-full"
                    alt="profile image"
                  />
                  <p className="text-md font-semibold">
                    {titleCase(request.requestSenderDetails.firstName)}{" "}
                    {titleCase(request.requestSenderDetails.lastName)}
                  </p>
                </div>
                <div>
                  <p className="text-md font-semibold">
                    {request.requestAmount}
                    <small>INR</small>{" "}
                  </p>
                  {/* <p>Status: {request.requestStatus}</p> */}
                  {/* <p>Date: {request.requestDate}</p> */}
                  {/* <p>Time: {request.requestTime}</p> */}
                  {/* <p>Note: {request.requestNote}</p> */}
                </div>
                <button
                  className="bg-button1 text-white text-md font-semibold px-4 py-2 rounded-lg shadow-md"
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
                  PAY
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PaymentRequests;
