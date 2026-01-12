import React from "react";
import axios from "axios";
import useDebounce from "../utils/debounce";
import { useEffect } from "react";
import CustomLink from "../components/CustomLink";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [createPassword, setCreatePassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [createPasswordError, setCreatePasswordError] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState("");
  const [isVerified, setIsVerified] = React.useState(false);

  const navigate = useNavigate();
  const debouncedCreatePassword = useDebounce(createPassword, 500);
  const debouncedConfirmPassword = useDebounce(confirmPassword, 500);

  // Password validation
  useEffect(() => {
    if (debouncedCreatePassword.length > 0) {
      const validatePassword = async () => {
        if (debouncedCreatePassword.length < 8) {
          setCreatePasswordError(
            "Password must be at least 8 characters long."
          );
        } else {
          setCreatePasswordError(null);
        }
      };
      validatePassword();
    }
  }, [debouncedCreatePassword]);

  // Confirm password validation
  useEffect(() => {
    if (debouncedConfirmPassword.length > 0) {
      const validateConfirmPassword = async () => {
        if (createPassword !== debouncedConfirmPassword) {
          setConfirmPasswordError("Passwords do not match.");
        } else {
          setConfirmPasswordError(null);
        }
      };
      validateConfirmPassword();
    }
  }, [debouncedConfirmPassword, createPassword]);

  return (
    <>
      <h1 className="text-2xl font-bold font-[REM] text-center bg-button1 text-white p-5">
        Reset Password
      </h1>
      <div className="flex flex-col items-center justify-center min-h-screen bg-accent1 ">
        <div className="bg-primary p-5">
          <label htmlFor="email" className="block text-md mb-1 font-semibold">
            Enter Registered Email:
          </label>
          <input
            className="w-full bg-gray-100 border border-gray-200 rounded-md p-2 focus:ring-2 focus:ring-gray-500 outline-none"
            type="email"
            id="email"
            name="email"
            required
            autoComplete="on"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {emailError && <p>{emailError}</p>}
          <button
            className="w-fit mt-4 bg-button1 text-white font-[REM] text-md font-bold py-2 px-4 rounded-full shadow hover:bg-button1light transition cursor-pointer"
            type="submit"
            onClick={async () => {
              const emailRegex = /@.*\.com$/;
              if (!emailRegex.test(email)) {
                setEmailError("Please enter a valid email");
                return;
              }

              await axios
                .post("http://localhost:5000/api/v1/users/forgotPassword", {
                  email,
                })
                .then((res) => {
                  if (res.data.message === "success") {
                    alert("OTP sent to your email");
                  } else {
                    setEmailError("Email not registered");
                  }
                })
                .catch((err) => {
                  console.error(err);
                });
            }}
          >
            Send OTP
          </button>
          <br />
          <br />
          <label htmlFor="otp" className="block text-md mb-1 font-semibold">
            Enter OTP:
          </label>
          <input
            type="text"
            id="otp"
            className="w-full bg-gray-100 border border-gray-200 rounded-md p-2 focus:ring-2 focus:ring-gray-500 outline-none"
          />
          <button
            className="w-fit mt-4 bg-button1 text-white font-[REM] text-md font-bold py-2 px-4 rounded-full shadow hover:bg-button1light transition cursor-pointer"
            type="submit"
            onClick={async () => {
              const otp = document.getElementById("otp").value;
              await axios
                .post("http://localhost:5000/api/v1/users/verifyotp", {
                  email,
                  otp,
                })
                .then((res) => {
                  if (res.data.message === "success") {
                    alert("OTP verified");
                    setIsVerified(true);
                  } else {
                    alert("Invalid OTP");
                    setIsVerified(false);
                  }
                })
                .catch((err) => {
                  console.error(err);
                });
            }}
          >
            Submit OTP
          </button>
          {isVerified && (
            <>
              <br />
              <br />
              <div>
                <label
                  htmlFor="createPassword"
                  className="block text-md mb-1 font-semibold"
                >
                  Create New Password:
                </label>
                <input
                  className="w-full bg-gray-100 border border-gray-200 rounded-md p-2 focus:ring-2 focus:ring-gray-500 outline-none"
                  type="password"
                  id="createPassword"
                  name="createPassword"
                  required
                  autoComplete="on"
                  onChange={(e) => {
                    setCreatePassword(e.target.value);
                  }}
                />
                {createPasswordError && <p className="text-red-500">{createPasswordError}</p>}
                <br />
                <br />
                <label
                  htmlFor="confirmPassword"
                  className="block text-md mb-1 font-semibold"
                >
                  Confirm Password:
                </label>
                <input
                  className="w-full bg-gray-100 border border-gray-200 rounded-md p-2 focus:ring-2 focus:ring-gray-500 outline-none"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  autoComplete="on"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
                {confirmPasswordError && <p className="text-red-500">{confirmPasswordError}</p>}
                <button
                  className="w-fit mt-4 bg-button1 text-white font-[REM] text-md font-bold py-2 px-4 rounded-full shadow hover:bg-button1light transition cursor-pointer"
                  type="submit"
                  onClick={async () => {
                    if (createPassword !== confirmPassword) {
                      alert("Passwords do not match");
                      return;
                    }
                    if (createPasswordError !== null || confirmPasswordError !== null) {
                      alert("Please fix the errors before submitting");
                      return;
                    }
                    await axios
                      .post(
                        "http://localhost:5000/api/v1/users/resetpassword",
                        {
                          email,
                          password: createPassword,
                        }
                      )
                      .then((res) => {
                        if (res.data.message === "success") {
                          alert("Password reset successfully");
                          navigate("/signin");
                        } else {
                          alert("Error resetting password");
                        }
                      })
                      .catch((err) => {
                        console.error(err);
                      });
                  }}
                >
                  Reset Password
                </button>
              </div>
            </>
          )}
          <div className="font-[REM] cursor-pointer mt-4 text-center">
            <CustomLink link="signin" text="Go To Sign-in Page" />
          </div>
        </div>
      </div>
    </>
  );
};
export default ForgotPassword;
