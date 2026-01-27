import React, { useState, useEffect } from "react";
import axios from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import titleCase from "../utils/titleCase";
import DesktopSideBar from "../components/DesktopSideBar";
import readableDate from "../utils/readableDate";
import readableTime from "../utils/readableTime";

const History = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/accounts/history/`,
          {
            withCredentials: true,
          },
        );
        setTransactions(response.data.transactions || []);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("Failed to load transaction history.");
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <>
      <div className="lg:flex h-screen">
        <DesktopSideBar />
        <div className="bg-primary h-screen flex-1">
          <div className=" bg-accent2 text-center p-5 lg:p-7 text-2xl lg:text-3xl font-bold font-[REM] relative">
            <button
              className="lg:hidden w-7 h-7 absolute left-5 top-1/2 -translate-y-1/2  hover:cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <img
                src="/images/arrow-left-solid.svg"
                alt="Back"
                className="w-full h-full"
              />
            </button>
            <h1>All Transactions</h1>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : transactions.length === 0 ? (
            <div className="w-full my-30 m-auto font-[REM] font-semibold text-lg text-center">
              <p>No transactions found.</p>
            </div>
          ) : (
            <div>
              {transactions.map((transaction) => {
                return (
                  <div
                    className="cursor-pointer bg-accent6 p-5 m-3 rounded-xl shadow-md"
                    key={transaction.id}
                    onClick={() =>
                      navigate("/transactiondetails", {
                        state: { transaction },
                      })
                    }
                  >
                    <div className="flex flex-row justify-between gap-2 items-center relative">
                      <div className="flex flex-row items-center justify-between gap-3">
                        <img
                          src="/images/defaultpic.jpg"
                          alt="profile image"
                          className="inline w-15 h-15 object-cover rounded-full"
                        />
                        <div className="font-semibold text-lg">
                          {" "}
                          {transaction.type === "sent"
                            ? `${titleCase(
                                transaction.receiverDetails.firstName,
                              )} ${titleCase(
                                transaction.receiverDetails.lastName,
                              )}`
                            : transaction.type === "received"
                              ? `${titleCase(
                                  transaction.senderDetails.firstName,
                                )} ${titleCase(
                                  transaction.senderDetails.lastName,
                                )}`
                              : "error"}
                        </div>
                      </div>
                      <div
                        className={`font-bold py-1 px-4 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                  ${
                                    transaction.type === "sent"
                                      ? "bg-red-200 text-red-800"
                                      : ""
                                  } 
                                  ${
                                    transaction.type === "received"
                                      ? "bg-green-200 text-green-800"
                                      : ""
                                  } 
                                  ${
                                    transaction.type === "failed"
                                      ? "bg-gray-200 text-gray-800"
                                      : ""
                                  }`}
                      >
                        {transaction.type}
                      </div>
                      <div className="flex flex-col items-end justify-between gap-1 font-[REM]">
                        <div className=" text-xl font-semibold">
                          Rs.{transaction.amount}
                        </div>
                        <div>
                          {readableDate(transaction.date)}
                          {", "}
                          {readableTime(transaction.date)}
                        </div>
                      </div>
                    </div>
                    <hr className="border-0 h-[2px]" />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default History;
