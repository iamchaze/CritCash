import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import titleCase from "../utils/titlecase";
import DesktopSideBar from "../components/DesktopSideBar";
const TransactionDetails = () => {
  const location = useLocation();
  const transaction = location.state?.transaction;
  const navigate = useNavigate();
  if (!transaction) {
    return <p>No transaction details available.</p>;
  }

  return (
    <>
      <div className="lg:flex h-screen">
        <DesktopSideBar />
        <div className="bg-primary h-screen flex-1">
          <div className="bg-button1">
            <h1 className="text-white text-center p-5 lg:p-7 text-2xl lg:text-3xl font-bold font-[REM]">
              Transaction Details
            </h1>
          </div>

          <div className=" mx-10">
            <div className="my-5 flex flex-col text-center">
              <div className="flex flex-col justify-center text-center font-[REM] font-bold my-5">
                <div className="bg-green-700 w-fit h-fit aspect-square rounded-full p-5 flex flex-row justify-center align-center my-5 mx-auto">
                  <img src="\src\assets\images\Icon.png" alt="" />
                </div>

                <p>
                  {transaction.type === "sent"
                    ? `Paid to ${transaction.receiverDetails.firstName} ${transaction.receiverDetails.lastName}`
                    : transaction.type === "received"
                    ? `Received from ${transaction.senderDetails.firstName} ${transaction.senderDetails.lastName}`
                    : "error"}
                </p>
              </div>

              <pre>
                <div className="flex flex-row justify-between font-[REM] font-semibold">
                  <p>Amount: </p>
                  <p>Rs. {transaction.amount}</p>{" "}
                </div>
                <br />
                <div className="flex flex-row justify-between font-[REM] font-semibold">
                  <p>Date:</p> <p>{transaction.date}</p>
                </div>{" "}
                <br />
                <div className="flex flex-row justify-between font-[REM] font-semibold">
                  <p>Time:</p> <p>{transaction.time}</p>
                </div>{" "}
                <br />
                <div className="flex flex-row justify-between font-[REM] font-semibold">
                  <p>Status:</p> <p>{transaction.status}</p>
                </div>{" "}
                <br />
                {transaction.note ? (
                  <div className="flex flex-row justify-between font-[REM] font-semibold">
                    {" "}
                    <p>Note:</p>
                    <p>{transaction.note}</p>{" "}
                  </div>
                ) : (
                  <div className="flex flex-row justify-between font-[REM] font-semibold">
                    <p>Note: </p>{" "}
                    <p className="text-gray-400">No note provided</p>
                  </div>
                )}{" "}
                <br />
                {transaction.type === "sent" ? (
                  <div className="flex flex-row justify-between font-[REM] font-semibold">
                    <p>Receiver Username:</p>{" "}
                    <p>{transaction.receiverDetails.username}</p>
                  </div>
                ) : transaction.type === "received" ? (
                  <div className="flex flex-row justify-between font-[REM] font-semibold">
                    <p>Receiver Username:</p>{" "}
                    <p>{transaction.senderDetails.username}</p>
                  </div>
                ) : (
                  ""
                )}
              </pre>
            </div>
          </div>
          <div className="flex flex-row justify-center">
            <button
              className="bg-button1 text-white font-[REM] font-semibold p-3 rounded-xl text-center"
              onClick={() =>
                navigate("/commonhistory", {
                  state: {
                    userId:
                      transaction.type === "sent"
                        ? transaction.receiverUserId
                        : transaction.type === "received"
                        ? transaction.senderUserId
                        : null,
                  },
                })
              }
            >
              See Transaction History with
              {transaction.type === "sent"
                ? ` ${titleCase(transaction.receiverDetails.firstName)}`
                : transaction.type === "received"
                ? ` ${titleCase(transaction.senderDetails.firstName)}`
                : ` unknown`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionDetails;
