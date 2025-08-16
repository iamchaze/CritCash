import React from "react";
import CustomLink from "../components/CustomLink";
import { useNavigate } from "react-router-dom";
// import '../styles/styles.css'
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen bg-primary absolute inset-0 -z-20">
      <div className="relative w-full h-screen overflow-hidden">
  {/* Background rectangles */}
  <div className="absolute inset-0 -z-10">
    <div className="left-rectangle bg-accent3"></div>
    <div className="right-rectangle bg-accent2"></div>
  </div>

  {/* Foreground content */}
  <div className="relative z-10">
    <div className="hidden lg:flex items-center justify-between">
      <p>PAYMATE.</p>
      <a href="">About Me</a>
      <button>Contact</button>
    </div>

    <h1>Finance Management In Smart Way</h1>
    <button className="bg-button1 text-white p-4 rounded-full font-bold font-[REM]"
      onClick={(e) => {
        e.preventDefault();
        navigate("/signup");
      }}
    >
      Take Me In
    </button>
    <CustomLink link="signin" text="Already Have an Account? Sign In" />
  </div>
</div>

    </div>
  );
};

export default Home;
