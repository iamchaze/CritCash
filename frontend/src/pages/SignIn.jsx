import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CustomLink from "../components/CustomLink";
import axios from "axios";
import useDebounce from "../utils/debounce";

const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [credentialsError, setCredentialsError] = useState("");
  const debouncedUsername = useDebounce(username, 500);
  const debouncedPassword = useDebounce(password, 500);

  return (
    <>
      <h1>Welcome Back!</h1>
      <h3>Get Closer To Your Finances</h3>
      <div>
        <div>
            {credentialsError && <p style={{ color: "red" }}>{credentialsError}</p>}
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button
          onClick={async () => {
            await axios
              .post("http://localhost:5000/api/v1/users/signin", {
                username: debouncedUsername,
                password: debouncedPassword,
              })
              .then((res) => {
                if (res.data.message === "invalid") {
                  setCredentialsError("Invalid Credentials");
                } else if (res.data.message === "success") {
                  setCredentialsError(null);
                  navigate("/dashboard");
                }
              })
              .catch((err) => {
                console.error(err);
              });
          }}
        >
          Sign In
        </button>
        <CustomLink link="signup" text="Don't Have an Account? Sign Up" />
      </div>
    </>
  );
};

export default SignIn;
