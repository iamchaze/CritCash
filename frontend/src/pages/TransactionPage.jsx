import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import titleCase from "../utils/titleCase";

const TransactionPage = () => {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [requestAmount, setRequestAmount] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const task = location.state?.task;
  const user = location.state?.user;
  useEffect(() => {
    if (task === "acceptpaymentrequest" && user) {
      setRequestAmount(user.requestAmount);
    }
  }, [task, user]);
  return (
  <>
    <div className="bg-gray-100 h-screen flex flex-col items-center lg:items-stretch justify-between relative">
      
      {/* Top section */}
      <div className="w-full pt-20 lg:pt-10 relative">
        {/* Split button - only visible on desktop */}
        <button className="hidden lg:block absolute top-5 right-10 bg-button1 text-white px-4 py-2 rounded-lg shadow-md">
          Split With Mates
        </button>

        {/* Profile */}
        <div className="flex flex-col items-center">
          <img
            src="/images/defaultpic.jpg"
            className="m-auto w-28 h-28 lg:w-32 lg:h-32 object-cover rounded-full"
            alt="person"
          />
          <div className="p-4 text-center text-lg font-semibold">
            <div>
              {user
                ? `${
                    task === "sendmoney" || task === "acceptpaymentrequest"
                      ? "Paying"
                      : task === "requestmoney"
                      ? "Requesting from"
                      : "Unknown Transaction"
                  }`
                : "Unknown Transaction"}
              <div className="bg-accent2 font-bold w-fit block m-auto mt-2 px-3 py-1 rounded-xl">
                {titleCase(user.firstName)} {titleCase(user.lastName)}
              </div>
            </div>
          </div>
        </div>

        {/* Amount input */}
        <div className="flex flex-col items-center justify-center mt-5">
          <div className="flex items-center">
            <input
              className="bg-gray-200 font-[REM] w-full text-center py-5 font-light  mx-auto p-2 rounded-lg "
              type="number"
              placeholder="Enter Amount"
              id="amount"
              name="amount"
              value={requestAmount ?? amount}
              disabled={requestAmount !== null}
              onChange={(e) => setAmount(e.target.value)}
            />
            <span className="font-[REM] ml-2">INR</span>
          </div>
        </div>
      </div>

      {/* Note input & Send button */}
      <div className="w-full px-5 lg:px-20">
        <div className="p-5 lg:w-[500px] m-auto">
          <input
            className="bg-gray-200 font-[REM] text-center py-3 font-light w-full p-2 rounded-lg "
            type="text"
            placeholder="Add Note"
            value={task === "acceptpaymentrequest" ? user.requestNote : note}
            disabled={task === "acceptpaymentrequest"}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <div className="flex justify-center lg:justify-end items-center m-5">
          <button
            className="bg-button1 text-primary text-2xl font-[REM] font-bold w-full lg:w-60 p-5 rounded-xl hover:bg-accent2 hover:text-button1 cursor-pointer transition-colors duration-300"
            onClick={async () => {
              const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/transactions/${
                  task === `acceptpaymentrequest`
                    ? `sendmoney?query=acceptpaymentrequest`
                    : task
                }`,
                {
                  to: user,
                  amount:
                    task === "acceptpaymentrequest" ? requestAmount : amount,
                  note: note !== "" ? note : null,
                },
                { withCredentials: true }
              );
              if (response.data.message == "Payment request sent") {
                alert("Payment request sent");
                navigate("/dashboard", { replace: true });
              } else if (response.data.message == "Money transferred") {
                alert("Money transferred");
                navigate("/dashboard", { replace: true });
              } else {
                alert(response.data.message);
              }
            }}
          >
            {task === "sendmoney" || task === "acceptpaymentrequest"
              ? `Send Money`
              : task === "requestmoney"
              ? `Request Money`
              : `Unknown Transaction`}
          </button>
        </div>
      </div>
    </div>
  </>
);

};

export default TransactionPage;
