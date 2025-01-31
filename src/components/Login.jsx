


import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../Redux/authenticationSlice";  // Import the login action
import login_img from "../assets/login.jpg";

const Login = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch(); // Get dispatch function

 
  const handleLogin = () => {
    if (username.trim()) {
      dispatch(login(username)); 
      localStorage.setItem("username", username); // Store username in localStorage
    }
  };
  

  return (
    <div className="flex min-h-screen w-full">
      <div className="w-1/2 h-screen">
        <img 
          src={login_img}
          alt="Chat Illustration" 
          className="w-full h-full object-cover" 
        />
      </div>
      <div className="w-1/2 h-screen flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
            Start your chat now
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none"
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            />
            <button
              onClick={handleLogin}
              className="w-full rounded-lg bg-green-600 px-4 py-3 mt-3 font-semibold text-white transition hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
