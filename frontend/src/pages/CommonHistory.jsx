import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import DesktopSideBar from "../components/DesktopSideBar";
import readableDate from "../utils/readableDate";
import readableTime from "../utils/readableTime";

const CommonHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const userId = location.state?.userId;

  useEffect(() => {
    if (!userId) {
      setError("No user details provided.");
      setLoading(false);
      return;
    }
    const fetchCommonHistory = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/accounts/history/${userId}`,
          { withCredentials: true }
        );
        console.log(response.data.transactions);
        setTransactions(response.data.transactions || []);
      } catch (err) {
        console.error("Error fetching common history:", err);
        setError("Failed to load common history.");
      } finally {
        setLoading(false);
      }
    };
    fetchCommonHistory();
  }, [userId]);

  return (
    <>
      <div className="lg:flex h-screen">
        <DesktopSideBar />
        <div className="bg-primary h-screen flex-1">
          <div className="bg-button1">
            <h1 className="text-white text-center p-5 lg:p-7 text-2xl lg:text-3xl font-bold font-[REM]">
              Common Transaction History
            </h1>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : transactions.length === 0 ? (
            <p>No transactions found.</p>
          ) : (
            <div>
              {transactions.map((transaction) => {
                const note = transaction.note;

                return (
                  <div
                    className="cursor-pointer bg-accent6 p-5 m-3 rounded-xl shadow-md"
                    key={transaction.id}
                  >
                    <div className="flex flex-row justify-between gap-2 items-center">
                      <div className="flex flex-row items-center justify-between gap-3">
                        <div className="font-semibold text-lg">
                          <span>Note: {} </span>
                          {note == null ? (
                            <span className="text-gray-600 font-[REM] font-medium">
                              No Note Provided
                            </span>
                          ) : (
                            <span className="font-[REM] text-black font-medium">{note}</span>
                          )}
                        </div>
                      </div>
                      <div
                        className={`font-bold py-1 px-4 rounded-full justify-center items-center
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
              <div>{}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CommonHistory;
