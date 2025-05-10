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
      <label htmlFor="email">Enter Registered Email:</label>
      <input
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
      <label htmlFor="otp">Enter Otp:</label>
      <input type="text" id="otp" />
      <button
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
          <label htmlFor="createPassword">Create New Password:</label>
          <input
            type="password"
            id="createPassword"
            name="createPassword"
            required
            autoComplete="on"
            onChange={(e) => {
              setCreatePassword(e.target.value);
            }}
          />
          {createPasswordError && <p>{createPasswordError}</p>}
          <br />
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            autoComplete="on"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          {confirmPasswordError && <p>{confirmPasswordError}</p>}
          <button
            type="submit"
            onClick={async () => {
              if (createPassword !== confirmPassword) {
                alert("Passwords do not match");
                return;
              }
              await axios
                .post("http://localhost:5000/api/v1/users/resetpassword", {
                  email,
                  password: createPassword,
                })
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
          <CustomLink link="signin" text="Sign In" />
        </>
      )}
    </>
  );
};
export default ForgotPassword;
