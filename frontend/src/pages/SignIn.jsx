import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";
import CustomLink from "../components/CustomLink";
import useDebounce from "../utils/debounce";
import Cookies from "js-cookie";
import DotLoader from "../components/DotLoader";

const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [credentialsError, setCredentialsError] = useState("");
  const [signinLoader, setSigninLoader] = useState(false);
  const debouncedUsername = useDebounce(username, 500);

  const isDisabled = !debouncedUsername || !password;

  return (
    <div className="min-h-screen flex justify-around items-center lg:px-10 gap-10 bg-accent1">
      <div
        className="hidden lg:inline-block relative min-w-100 w-200 lg:min-h-screen bg-cover bg-center rounded-md"
        style={{
          backgroundImage: "url('/images/DeWatermark.ai_1755539134560.png')",
        }}
      >
        <p className="absolute left-10 bottom-20 text-6xl text-white font-[#F4FBF8] drop-shadow-2xl/50">
          Empowering <br /> finances, one tap <br /> at a time
        </p>
      </div>

      <div className="h-screen lg:min-h-screen w-200 bg-primary shadow-lg p-6">
        <div className="flex justify-end" onClick={() => navigate("/")}>
          <img
            className="w-6 h-6 cursor-pointer"
            src="/images/+.svg"
            alt="close"
          />
        </div>

        <h1 className="text-2xl font-semibold font-[REM] text-black">
          Welcome Back!
        </h1>
        <h3 className="text-gray-500 text-sm font-[REM] mb-6">
          Get Closer To Your Finances <span role="img">💰</span>
        </h3>

        <div className="space-y-4">
          {credentialsError && (
            <p className="text-red-500 text-xs">{credentialsError}</p>
          )}

          <div>
            <label className="block text-sm mb-1 font-semibold">Username</label>
            <input
              disabled={signinLoader}
              type="text"
              className="w-full bg-gray-100 border border-gray-200 rounded-md p-2 focus:ring-2 focus:ring-gray-500 outline-none"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-semibold">Password</label>
            <input
              disabled={signinLoader}
              type="password"
              className="w-full bg-gray-100 border border-gray-200 rounded-md p-2 focus:ring-2 focus:ring-gray-500 outline-none"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div
            disabled={isDisabled}
            className={`w-full mt-4 text-xl font-bold py-3 rounded-full shadow transition-all font-[REM] text-center
              ${
                isDisabled
                  ? "bg-button1 opacity-50 cursor-not-allowed"
                  : "bg-button1 text-white cursor-pointer hover:translate-y-[-0.1rem] hover:shadow-lg transition-all duration-200 ease-in-out active:translate-0.5 active:bg-accent5"
              }
            transition-all duration-200 ease-in-out`}
            onClick={async () => {
              try {
                setSigninLoader(true);
                const res = await axios.post(
                  `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/signin`,
                  { username: debouncedUsername, password },
                );

                if (res.data.message === "invalid") {
                  setCredentialsError("Invalid Credentials");
                  return;
                }

                localStorage.setItem("token", res.data.token);
                navigate("/dashboard");
              } catch (err) {
                console.error(err);
                setCredentialsError("Something went wrong. Server Error.");
              }
            }}
          >
            {signinLoader ? (
              <DotLoader className="m-auto" />
            ) : (
              <button className="hover:cursor-pointer">Sign In</button>
            )}
          </div>
        </div>

        {/* Links */}
        <div className="mt-4 text-center space-y-2 font-[REM]">
          <CustomLink link="forgotpassword" text="Forgot Password?" />
          <div className="underline">
            <CustomLink link="signup" text="Don't Have an Account? Sign Up" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
