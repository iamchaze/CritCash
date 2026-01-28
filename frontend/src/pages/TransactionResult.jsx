import { useLocation, useNavigate } from "react-router-dom";
import titleCase from "../utils/titleCase";

const TransactionResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;
  const amount = location.state?.amount;
  const result = location.state?.result;
  const message = location.state?.message;
  const transactionId = location.state?.transactionId;

  return (
    <>
      <div
        className={`${result === "success" ? "bg-green-600" : "bg-red-300"} w-full h-full absolute`}
      >
        <div
          className="absolute z-2 m-5 hover:cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <img
            src="/images/Home.svg"
            className="w-6 h-6 hover:cursor-pointer"
            alt="home"
          />
        </div>
        <div className="relative z-1 flex flex-col items-center justify-around h-full">
          <div className="text-white text-center">
            <h1 className="text-2xl lg:text-4xl font-bold font-[REM]">
              Transaction {result === "success" ? "Successful" : "Failed"}
            </h1>
            <img
              className="m-auto mt-20 mb-20"
              src={
                result === "success"
                  ? "/images/checkicon.png"
                  : "/images/crossicon.png"
              }
              alt=""
            />
            <div className="flex flex-row justify-around items-center mb-20">
              <img
                className="inline w-15 h-15 object-cover rounded-full"
                src="/images/defaultpic.jpg"
                alt=""
              />
              <img
                className="object-fit w-10 h-10"
                src={`${result === "success" ? "/images/transfericon.png" : "/images/cross-circle.png"}`}
                alt=""
              />
              <img
                className="inline w-15 h-15 object-cover rounded-full"
                src="/images/defaultpic.jpg"
                alt=""
              />
            </div>
            <div className="text-white font-[REM]">
              <p className="font-bold text-2xl">{amount} INR</p>
              <p className=" text-lg">
                {result === "success" ? "Sent to" : "Cannot Send to"}{" "}
                {titleCase(user.firstName)} {titleCase(user.lastName)}
              </p>
              <p className={result === "success" ? `block` : `hidden`}>
                {new Date().toLocaleDateString()}{" "}
                {new Date().toLocaleTimeString()}
              </p>
              <div
                className={`py-4 bg-gray-500 rounded-lg lg:text-xl mt-10 font-[REM] ${result === "success" ? `hidden` : `block`}`}
              >
                <p>{message}!</p>
              </div>
            </div>
          </div>
          <div
            className={`bg-button1 py-3 px-5 lg:py-5 lg:px:7 text-white font-[REM] font-bold rounded-md hover:bg-button1dark hover:cursor-pointer hover:translate-[-0.1rem] active:translate-0.5 active:bg-button1light active:cursor-pointer transition-all duration-300 ${result === "success" ? `block` : `hidden`}`}
            onClick={() => {
              if (transactionId) {
                navigate("/transactiondetails", {
                  state: {
                    transactionId,
                  },
                });
              } else {
                // Fallback: go to full history if no specific transaction id is available
                navigate("/history");
              }
            }}
          >
            <button className="hover:cursor-pointer lg:text-3xl">
              View Details
            </button>
          </div>
          <div
            className={`bg-button1 py-3 px-5 lg:py-5 lg:px:7 text-white font-[REM] font-bold rounded-md hover:bg-button1dark hover:cursor-pointer hover:translate-[-0.1rem] active:translate-0.5 active:bg-button1light active:cursor-pointer transition-all duration-300 ${result === "success" ? `hidden` : `block`}`}
          >
            <button onClick={() => navigate(-1)} className="hover:cursor-pointer lg:text-3xl">
              Retry
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionResult;
