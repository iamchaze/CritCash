import React from "react";
import CustomLink from "../components/CustomLink";
import { useState, useEffect } from "react";
import useDebounce from "../utils/debounce";
import api from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

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
  const [walletKey, setWalletKey] = useState("");

  //Error/Success states
  const [firstNameError, setFirstNameError] = useState(null);
  const [lastNameError, setLastNameError] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [contactError, setContactError] = useState(null);
  const [createPasswordError, setCreatePasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [walletKeyError, setWalletKeyError] = useState(null);
  const debouncedFirstName = useDebounce(firstName, 500);
  const debouncedLastName = useDebounce(lastName, 500);
  const debouncedUsername = useDebounce(username, 500);
  const debouncedEmail = useDebounce(email, 500);
  const debouncedContact = useDebounce(contact, 500);
  const debouncedCreatePassword = useDebounce(createPassword, 500);
  const debouncedConfirmPassword = useDebounce(confirmPassword, 500);
  const debouncedWalletKey = useDebounce(walletKey, 500);

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
        const res = await api.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/usernameValidate`,
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
        const res = await api.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/emailValidate`,
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
          const res = await api.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/contactValidate`,
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

  //Wallet Key validation
  useEffect(() => {
    let isMounted = true; // Helps ignore old responses
    if (debouncedWalletKey.length > 0) {
      const validateWalletKey = async () => {
        const walletKeyRegex = /^[A-Za-z0-9]{8,}$/;
        if (walletKeyRegex.test(debouncedWalletKey) == false) {
          setWalletKeyError(
            "Wallet Key must be at least 8 characters long and contain only alphanumeric characters."
          );
          return;
        }
        try {
          const res = await api.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/walletKeyValidate`,
            {
              walletKey: debouncedWalletKey,
            }
          );
          if (isMounted) {
            if (res.data?.available) {
              setWalletKeyError(null);
            } else {
              setWalletKeyError("Wallet Key is already taken.");
            }
          }
        } catch (error) {
          if (isMounted) {
            setWalletKeyError("Error checking wallet Key.");
          }
          console.error("Wallet Key check failed:", error);
        }
      };
      validateWalletKey();
    }
    return () => {
      isMounted = false; // Cleanup function to ignore old responses
    };
  }, [debouncedWalletKey]);

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
      <div className="min-h-screen flex justify-around items-center lg:px-10 gap-10 bg-accent1">
        <div
          className="hidden lg:inline-block relative min-w-100  w-200 lg:min-h-screen bg-cover bg-center rounded-md"
          style={{
            backgroundImage: "url('/images/DeWatermark.ai_1755539134560.png')",
          }}
        >
          <p className="absolute left-10 bottom-20 text-6xl text-white font-[#F4FBF8] drop-shadow-2xl/50">Empowering <br /> finances, one tap <br /> at a time</p>
        </div>
        <div className="lg:min-h-screen w-200  bg-primary shadow-lg p-6">
          <div className="flex justify-end" onClick={() => navigate("/")}>
            <img
              className="w-6 h-6 cursor-pointer"
              src="/images/+.svg"
              alt="close"
            />
          </div>

          <h1 className="text-2xl font-semibold font-[REM] text-black">
            Create Your Account
          </h1>
          <h3 className="text-gray-500 text-sm font-[REM] mb-6">
            Get Closer To Your Finances <span role="img">😎</span>
          </h3>

          {/* Form */}
          <div className="space-y-4">
            {/* First + Last name */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm mb-1 font-semibold">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-100 border border-gray-200 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                {firstNameError && (
                  <p className="text-red-500 text-xs">{firstNameError}</p>
                )}
              </div>
              <div>
                <label className="block text-sm mb-1 font-semibold">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-100 border border-gray-200 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                {lastNameError && (
                  <p className="text-red-500 text-xs">{lastNameError}</p>
                )}
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm mb-1 font-semibold">
                Username
              </label>
              <input
                type="text"
                className="w-full bg-gray-100 border border-gray-200 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              {usernameError && (
                <p
                  className={`text-xs ${
                    usernameError === "Username is available."
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {usernameError}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm mb-1 font-semibold">Email</label>
              <input
                type="email"
                className="w-full bg-gray-100 border border-gray-200 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {emailError && (
                <p className="text-red-500 text-xs">{emailError}</p>
              )}
            </div>

            {/* Contact */}
            <div>
              <label className="block text-sm mb-1 font-semibold">
                Contact Number
              </label>
              <input
                type="text"
                className="w-full bg-gray-100 border border-gray-200 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => setContact(e.target.value)}
                required
              />
              {contactError && (
                <p className="text-red-500 text-xs">{contactError}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm mb-1 font-semibold">
                Create Password
              </label>
              <input
                type="password"
                className="w-full bg-gray-100 border border-gray-200 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => setCreatePassword(e.target.value)}
                required
              />
              {createPasswordError && (
                <p className="text-red-500 text-xs">{createPasswordError}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm mb-1 font-semibold">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full bg-gray-100 border border-gray-200 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {confirmPasswordError && (
                <p className="text-red-500 text-xs">{confirmPasswordError}</p>
              )}
            </div>

            {/* Wallet Key */}
            <div>
              <label className="block text-sm mb-1 font-semibold">
                Create a Unique WalletId
              </label>
              <input
                type="text"
                className="w-full bg-gray-100 border border-gray-200 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => setWalletKey(e.target.value)}
                required
              />
              {walletKeyError && (
                <p className="text-red-500 text-xs">{walletKeyError}</p>
              )}
            </div>

            {/* Submit */}
            <button
              className="w-full mt-4 bg-button1 text-white font-[REM] text-xl font-bold py-3 rounded-full shadow hover:bg-button1light transition"
              onClick={async () => {
                if (
                  firstNameError ||
                  lastNameError ||
                  usernameError !== "Username is available." ||
                  emailError ||
                  contactError ||
                  createPasswordError ||
                  confirmPasswordError ||
                  walletKeyError
                ) {
                  alert("Please fix the errors before submitting.");
                } else {
                  await axios
                    .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/signup`, {
                      firstName,
                      lastName,
                      username,
                      email,
                      contact,
                      password: createPassword,
                      walletKey,
                    })
                    .then(() => {
                      navigate("/signin");
                      alert("User Created Successfully!");
                    })
                    .catch((err) => console.log(err));
                }
              }}
            >
              Create Account
            </button>
          </div>

          {/* Link */}
          <div className="mt-4 text-center underline font-[REM]">
            <CustomLink link="signin" text="Already Have an Account? Sign In" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
