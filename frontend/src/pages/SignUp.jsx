import React from "react";
import CustomLink from "../components/CustomLink";
import { useState, useEffect } from "react";
import useDebounce from "../utils/debounce";
import axios from "axios";
import {useNavigate} from 'react-router-dom'; 

const SignUp = () => {
  const navigate = useNavigate();
  //Input states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [walletId, setWalletId] = useState("");

  //Error/Success states
  const [firstNameError, setFirstNameError] = useState(null);
  const [lastNameError, setLastNameError] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [contactError, setContactError] = useState(null);
  const [createPasswordError, setCreatePasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [walletIdError, setWalletIdError] = useState(null);

  const debouncedFirstName = useDebounce(firstName, 500);
  const debouncedLastName = useDebounce(lastName, 500);
  const debouncedUsername = useDebounce(username, 500);
  const debouncedEmail = useDebounce(email, 500);
  const debouncedContact = useDebounce(contact, 500);
  const debouncedCreatePassword = useDebounce(createPassword, 500);
  const debouncedConfirmPassword = useDebounce(confirmPassword, 500);
  const debouncedWalletId = useDebounce(walletId, 500);

  //First name validation
  useEffect(() => {
    let isMounted = true; // Helps ignore old responses
    const validateFirstName = async () => {
      const nameRegex = /^[A-Za-z]+$/;
      if (!debouncedFirstName) {
        setFirstNameError(null);
        return;
      } else if (debouncedFirstName.trim().length < 2) {
        setFirstNameError("First name must be at least 3 characters long.");
        return;
      } else if (nameRegex.test(debouncedFirstName) == false) {
        setFirstNameError("First name must only contain alphabets.");
        return;
      } else if (debouncedFirstName.trim().length > 15) {
        setFirstNameError("First name must be at most 15 characters long.");
        return;
      } else if (isMounted) {
        setFirstNameError(null);
        return;
      }
    };
    validateFirstName();
    return () => {
      isMounted = false; // Cleanup function to ignore old responses
    };
  }, [debouncedFirstName]);

  // Last name validation
  useEffect(() => {
    let isMounted = true; // Helps ignore old responses
    const validateLastName = async () => {
      const nameRegex = /^[A-Za-z]+$/;
      if (!debouncedLastName) {
        setLastNameError(null);
        return;
      } else if (debouncedLastName.trim().length < 2) {
        setLastNameError("Last name must be at least 3 characters long.");
        return;
      } else if (nameRegex.test(debouncedLastName) == false) {
        setLastNameError("Last name must only contain alphabets.");
        return;
      } else if (debouncedLastName.trim().length > 15) {
        setLastNameError("Last name must be at most 15 characters long.");
        return;
      } else if (isMounted) {
        setLastNameError(null);
        return;
      }
    };
    validateLastName();
    return () => {
      isMounted = false; // Cleanup function to ignore old responses
    };
  }, [debouncedLastName]);

  //Username validation
  useEffect(() => {
    let isMounted = true; // Helps ignore old responses

    const validateUsername = async () => {
      if (!debouncedUsername) {
        setUsernameError(null);
        return;
      }
      if (debouncedUsername.length < 4) {
        setUsernameError("Username must be at least 4 characters long.");
        return;
      }
      try {
        const res = await axios.post(
          `http://localhost:5000/api/v1/users/usernameValidate`,
          {
            username: debouncedUsername,
          }
        );
        if (isMounted) {
          if (res.data?.available) {
            setUsernameError("Username is available.");
          } else {
            setUsernameError("Username is already taken.");
          }
        }
      } catch (error) {
        if (isMounted) {
          setUsernameError("Error checking username.");
        }
        console.error("Username check failed:", error);
      }
    };

    validateUsername();

    // Cleanup function to ignore old responses
    return () => {
      isMounted = false;
    };
  }, [debouncedUsername]);

  //Email validation
  useEffect(() => {
    let isMounted = true; // Helps ignore old responses
    const validateEmail = async () => {
      if (!debouncedEmail) {
        setEmailError(null);
        return;
      }

      const emailRegex = /@.*\.com$/;
      if (emailRegex.test(debouncedEmail) == false) {
        setEmailError("Email is not valid.");
        return;
      }

      try {
        const res = await axios.post(
          `http://localhost:5000/api/v1/users/emailValidate`,
          {
            email: debouncedEmail,
          }
        );
        if (isMounted) {
          if (res.data?.available) {
            setEmailError(null);
          } else {
            setEmailError("Email is already taken.");
          }
        }
      } catch (error) {
        if (isMounted) {
          setEmailError("Error checking email.");
        }
        console.error("Email check failed:", error);
      }
    };

    validateEmail();

    return () => {
      isMounted = false; // Cleanup function to ignore old responses
    };
  }, [debouncedEmail]);

  //Contact validation
  useEffect(() => {
    let isMounted = true; // Helps ignore old responses
    if (debouncedContact.length > 0) {
      const validateContact = async () => {
        const contactRegex = /^[0-9]{10}$/;
        if (contactRegex.test(debouncedContact) == false) {
          setContactError("Contact number is not valid.");
          return;
        } 
        try {
          const res = await axios.post(
            `http://localhost:5000/api/v1/users/contactValidate`,
            {
              contact: debouncedContact,
            }
          );
          if (isMounted) {
            if (res.data?.available) {
              setContactError(null);
            } else {
              setContactError("Contact number is already taken.");
            }
          }
        } catch (error) {
          if (isMounted) {
            setContactError("Error checking contact number.");
          }
          console.error("Contact check failed:", error);
        }
      };
      validateContact();
    }
    return () => {
      isMounted = false; // Cleanup function to ignore old responses
    };
  }, [debouncedContact]);

  //Wallet ID validation
  useEffect(() => {
    let isMounted = true; // Helps ignore old responses
    if (debouncedWalletId.length > 0) {
      const validateWalletId = async () => {
        const walletIdRegex = /^[A-Za-z0-9]{8,}$/;
        if (walletIdRegex.test(debouncedWalletId) == false) {
          setWalletIdError("Wallet ID must be at least 8 characters long and contain only alphanumeric characters.");
          return;
        } 
        try{
          const res = await axios.post(
            `http://localhost:5000/api/v1/users/walletIdValidate`,{
              walletId: debouncedWalletId,
            })
            if (isMounted) {
              if (res.data?.available) {
                setWalletIdError(null);
              } else {
                setWalletIdError("Wallet ID is already taken.");
              }
            }
        } catch (error) {
          if (isMounted) {
            setWalletIdError("Error checking wallet ID.");
          }
          console.error("Wallet ID check failed:", error);
        }
      };
      validateWalletId();
    }
    return () => {
      isMounted = false; // Cleanup function to ignore old responses
    }
  }, [debouncedWalletId]);

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
          {firstNameError && <p>{firstNameError}</p>}
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
          {lastNameError && <p>{lastNameError}</p>}
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
            autoComplete="on"
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
            autoComplete="on"
          />
          {emailError && <p>{emailError}</p>}
        </div>
        <div>
          <label htmlFor="contact">Contact Number:</label>
          <input
            type="text"
            id="contact"
            name="contact"
            onChange={(e) => setContact(e.target.value)}
            required
          />
          {contactError && <p>{contactError}</p>}
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
          {createPasswordError && <p>{createPasswordError}</p>}
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
          {confirmPasswordError && <p>{confirmPasswordError}</p>}
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
          {walletIdError && <p>{walletIdError}</p>}
        </div>
        <input
          type="button"
          value="Submit"
          onClick={async () => {
            if (
              firstNameError ||
              lastNameError ||
              usernameError !== "Username is available." ||
              emailError ||
              contactError ||
              createPasswordError ||
              confirmPasswordError ||
              walletIdError
            ) {
              alert("Please fix the errors before submitting.");
            } else {
              await axios
                .post(`http://localhost:5000/api/v1/users/signup`, {
                  firstName,
                  lastName,
                  username,
                  email,
                  contact,
                  password: createPassword,
                  walletId,
                })
                .then(() => {
                  navigate("/signin");
                  alert("User Created Successfully!");
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          }}
        />
      </div>
      <CustomLink link="signin" text="Already Have an Account? Sign In" />
    </>
  );
};
export default SignUp;
