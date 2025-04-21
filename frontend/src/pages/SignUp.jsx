import React from "react";
import CustomLink from "../components/CustomLink";
import { useState } from "react";
import useDebounce from "../utils/debounce";

const SignUp = () => {

  //Input states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [walletId, setWalletId] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  //Error/Success states
  const [usernameError, setUsernameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  

  // const displayData = () => {
  //   console.log("First Name:", firstName);
  //   console.log("Last Name:", lastName);
  //   console.log("Username:", username);
  //   console.log("Email:", email);
  //   console.log("Contact Number:", contact);
  //   console.log("Create Password:", createPassword);
  //   console.log("Confirm Password:", confirmPassword);
  //   console.log("Wallet ID:", walletId);
  // };

  const debouncedUsername = useDebounce(username, 500);
  const debouncedEmail = useDebounce(email, 500);
  const debouncedContact = useDebounce(contact, 500);
  const debouncedWalletId = useDebounce(walletId, 500);

  return (
    <>
      <div>
        <h1>Create Your Account</h1>
        <h3>Get Closer To Your Finances</h3>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            required
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={(e) => {
              setUsername(e.target.value);
              console.log(debouncedUsername);
            if(debouncedUsername.length > 0) {
                if(debouncedUsername == "viraj"){
                  setUsernameError("Username already taken.");
              } else {
                setUsernameError("Username is available.");
              }
            }
            }}
            required
          />
          {usernameError && <p>{usernameError}</p>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="contact">Contact Number:</label>
          <input
            type="number"
            id="contact"
            name="contact"
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="createPassword">Create Password:</label>
          <input
            type="password"
            id="createPassword"
            name="createPassword"
            onChange={(e) => setCreatePassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="walletId">Create Unique Wallet ID:</label>
          <input
            type="text"
            id="walletId"
            name="walletId"
            onChange={(e) => setWalletId(e.target.value)}
            required
          />
        </div>
        <input type="button" value="Submit" />
      </div>
      <CustomLink link="forgotpassword" text="Forgot Password?" />
      <CustomLink link="signin" text="Already Have an Account? Sign In" />
    </>
  );
};
export default SignUp;
