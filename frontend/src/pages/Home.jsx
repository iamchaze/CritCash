import React from "react";
import CustomLink from "../components/CustomLink";
import { useNavigate } from "react-router-dom";
// import '../styles/styles.css'
const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* Background content */}
      <div className="h-screen bg-primary absolute inset-0 -z-20">
        <div className="relative w-full h-screen overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="left-rectangle bg-accent3"></div>
            <div className="right-rectangle bg-accent2"></div>
            <div className="bottom-rectangle bg-accent1"></div>
          </div>
        </div>
      </div>
      {/* Foreground content */}
      <div className="">
        <div className="hidden lg:flex items-center justify-between my-10 mx-25">
          <p className="font-[REM] font-bold text-2xl cursor-pointer" onClick={() => {
            navigate("/");
          }}>CRITCASH.</p>
          <div className="flex gap-10 items-center">
            <a href="" className="font-[REM] text-lg cursor-pointer">
              About Me
            </a>
            <button className="font-[REM] bg-button1 text-white py-3 px-8 rounded-full font-bold text-lg cursor-pointer">
              Contact
            </button>
          </div>
        </div>
        <div className="lg:flex lg:gap-5 lg:items-center lg:justify-between lg:px-25 lg:py-10 transition-all duration-500 ease-in-out">
          <div className="order-2 w-auto">
            <img
              className=" mx-auto w-100 h-100 lg:w-120 lg:h-120 max-w-100 lg:max-w-120 transition-all duration-500 ease-in-out"
              src="/images/e9f1c2c368f1f9d97982078a54d90e81c5d8cdf5.png"
              alt="no image found"
            />
          </div>
          <div className="order-1 ml-10 pb-10 lg:ml-0 lg:pb-0 lg:text-left transition-all duration-500 ease-in-out">
            <h1 className="font-[Righteous] text-5xl lg:text-7xl">
              <span className="text-button1">Finance</span>
              <br /> Management <br /> In{" "}
              <span className="text-accent4">Smart</span> Way
            </h1>
            <div className="lg:flex lg:items-center lg:space-between">
              <div className="inline-block mt-8 bg-button1 text-white py-4 px-8 rounded-full shadow-lg/30 font-bold text-2xl font-[REM]">
                <CustomLink link="signup" text="Take Me In" />
              </div>
              <div className="hidden lg:inline-block mt-8 py-4 px-8 font-bold text-2xl font-[REM] text-button1 ">
                <CustomLink link="signin" text="Sign In" /> 
              </div>
            </div>
          </div>
        </div>
        <div className="text-center text-lg underline font-[REM] lg:hidden">
          <CustomLink link="signin" text="Already Have an Account? Sign In" />
        </div>

        {/* Feature highlight section */}
        <section className="mt-16 px-6 lg:px-25 py-10">
          <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-accent2/50">
            <div className="grid gap-10 lg:grid-cols-2 items-center p-8 lg:p-12">
              <div className="flex justify-center">
                <img
                  src="/images/Iphonetheme.png"
                  alt="CritCash app preview"
                  className="w-64 lg:w-80 drop-shadow-xl"
                />
              </div>
              <div className="space-y-4 text-left font-[REM]">
                <h2 className="text-2xl lg:text-3xl font-bold text-button1">
                  All your payments in one smart app
                </h2>
                <p className="text-gray-700">
                  Manage deposits, track transactions, and send or request money securely with a clean,
                  intuitive interface designed for everyday use.
                </p>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent4" />
                    <span>Instant transfers with real-time transaction status.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent5" />
                    <span>Clear history and detailed breakdown of every payment.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent3" />
                    <span>Modern, responsive experience across desktop and mobile.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
