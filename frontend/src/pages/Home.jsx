import React from "react";
import CustomLink from "../components/CustomLink";
import { useNavigate } from "react-router-dom";
// import '../styles/styles.css'
const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* Background content */}
      <div className="h-screen bg-primary absolute inset-0 -z-20 lg:hidden">
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
          <p
            className="font-[REM] font-bold text-2xl cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            CRITCASH.
          </p>
          <div className="flex gap-10 items-center">
            <a
              href=""
              className="font-[REM] text-lg cursor-pointer hover:underline"
            >
              About Us
            </a>
            <button className="font-[REM] bg-button1 text-white py-3 px-8 rounded-full font-bold text-lg cursor-pointer hover:translate-y-[-0.1rem] hover:shadow-lg transition-all duration-200 ease-in-out active:translate-0.5 active:bg-accent5">
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
              <div className="inline-block mt-8 bg-button1 text-white py-4 px-8 rounded-full shadow-lg/30 font-bold text-2xl font-[REM]  hover:translate-y-[-0.1rem] hover:shadow-lg transition-all duration-200 ease-in-out active:translate-0.5 active:bg-accent5">
                <CustomLink link="signup" text="Take Me In" />
              </div>
              <div className="hidden lg:inline-block mt-8 py-4 px-8 font-bold text-2xl font-[REM] text-button1  hover:translate-y-[-0.1rem] hover:underline active:translate-0.5 transition-all duration-200 ease-in-out ml-10">
                <CustomLink link="signin" text="Sign In" />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-lg underline font-[REM] lg:hidden">
          <CustomLink link="signin" text="Already Have an Account? Sign In" />
        </div>
        {/* Iphone image */}
        <div className="hidden lg:block w-fit h-fit mx-auto px-40">
          <img src="/images/Iphonetheme.png" alt="" />
        </div>
        <div className="font-[REM] text-md italic my-30">
          <div className="hidden justify-around lg:flex lg:flex-row">
            <div className="hover:underline cursor-pointer">
              {" "}
              <a
                href="https://iamchaze.github.io/portfolio.github.io/index.html"
                target="_blank"
              >
                About Me
              </a>
            </div>
            <div className="hover:underline cursor-pointer"> 
              <a href="https://github.com/iamchaze/CritCash" target="_blank">
                GitHub Link
              </a>
            </div>
            <div className="hover:underline cursor-pointer">
              <a
                href="https://www.linkedin.com/in/viraj-kale-064baa184/"
                target="_blank"
              >
                Socials
              </a>
            </div>
          </div>
          <div className="m-20 text-center">
            Made with ❤️ by <span className="font-bold">Viraj Kale</span>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
