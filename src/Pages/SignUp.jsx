import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const isStrongPassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [role, setRole] = useState("");
  const [roleError, setRoleError] = useState("");

  const validateForm = () => {
    let valid = true;

    if (!userName.trim()) {
      setUserNameError("Username is required");
      valid = false;
    } else {
      setUserNameError("");
    }

    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Email is not valid");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      valid = false;
    } else if (!isStrongPassword(password)) {
      setPasswordError(
        "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!role.trim()) {
      setRoleError("Please select a role");
      valid = false;
    } else {
      setRoleError("");
    }

    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        console.log("Submit")
        const response = await axios.post(
          "https://safety-drive-connect-backend-project-2.onrender.com/api/v1/signup",
          {
            userName: userName,
            email: email,
            password: password,
            role: role

          }
        );
        console.log(response.data); // Assuming you want to log the response data
        // Redirect or perform any necessary action upon successful signup
         navigate('/OTP'); // Example: Redirect to home page

      } catch (error) {
        console.error("Error signing up:", error);
        // Handle error state, show error message, etc.
      }
    }
  };

  return (
    <div className="bg-white border-black flex flex-col justify-center min-h-screen overflow-hidden p-8 md:p-32">
      <div className="bg-green-200 p-8 md:p-24 m-auto rounded-xl shadow-xl w-full md:w-[782px]">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-black uppercase mb-8 md:mb-16">
          Sign Up
        </h2>
        <form>
          <div className="mb-4">
            <input
              className="border-2 rounded-lg text-black px-4 py-2 w-full bg-white"
              type="text"
              id="username"
              name="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Username"
            />
            {userNameError && <p className="text-red-500">{userNameError}</p>}
          </div>
          <div className="mb-4">
            <input
              className="border-2 rounded-lg px-4 py-2 text-black w-full bg-white"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>
          <div className="mb-4">
            <input
              className="border-2 text-black rounded-lg px-4 py-2 w-full bg-white"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>
          <div className="mb-4">
            <select
              className="border-2 rounded-lg px-4 py-2 text-black w-full bg-white"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select Role</option>
              <option value="Customer">Customer</option>
              <option value="Driver">Driver</option>
            </select>
            {roleError && <p className="text-red-500">{roleError}</p>}
          </div>
          <button
            onClick={(e) => handleSubmit(e)}
            className="w-full px-4 py-2 tracking-wide bg-green-700 rounded-xl text-white transition-colors duration-200 transform hover:bg-green-600 focus:outline-none" // Change type to "button"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
