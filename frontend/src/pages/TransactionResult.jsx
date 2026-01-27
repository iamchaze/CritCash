import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import titleCase from "../utils/titleCase";

const TransactionResult = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user;
    const amount = location.state?.amount;
    const task = location.state?.task;
    const note = location.state?.note;

     useEffect(() => {
            console.log(user, amount, task, note);
      }, []);


  return (
    <>
      <div className="bg-green-600 w-full h-full absolute">
        <div className="absolute z-2 m-5 hover:cursor-pointer" onClick={() => navigate("/dashboard")}>
          <img src="/images/Home.svg" className="w-6 h-6 hover:cursor-pointer" alt="home" />
        </div>
        <div className="relative z-1 flex flex-col items-center justify-around h-full">
          <div className="text-white text-center">
            <h1 className="text-4xl font-bold font-[REM]">
              Transaction Successful!
            </h1>
            <img className="m-auto mt-20" src="/images/checkicon.png" alt="" />
            <div className="flex flex-row justify-around items-center mt-20">
              <img
                className="inline w-15 h-15 object-cover rounded-full"
                src="/images/defaultpic.jpg"
                alt=""
              />
              <img
                className="object-fit w-10 h-10"
                src="/images/transfericon.png"
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
              <p className=" text-lg">Sent to {titleCase(user.firstName)} {titleCase(user.lastName)}</p>
              <p>{new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</p>
            </div>
          </div>
          <div className="bg-button1 py-3 px-5 text-white font-[REM] font-bold rounded-md hover:bg-button1dark hover:cursor-pointer hover:translate-[-0.1rem] transition-all active:translate-0.5 active:bg-button1light active:cursor-pointer">
            <button className="hover:cursor-pointer text-xl">View Details</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionResult;
