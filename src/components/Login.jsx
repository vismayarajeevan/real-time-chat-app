


import React, { useState } from "react";
import login_img from '../assets/login.jpg'

const InputField = ({ value, onChange, placeholder, onKeyPress }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none"
      onKeyPress={onKeyPress}
    />
  );
};

const Button = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-lg bg-green-600 px-4 py-2 font-semibold text-white transition hover:bg-green-700"
    >
      {children}
    </button>
  );
};

const Card = ({ children }) => {
  return (
    <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
      {children}
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (username.trim()) {
      console.log("User logged in:", username);
    }
  };

  return (
    <div className="flex min-h-[100vh] items-center justify-center bg-green-100">
      <div className="flex w-full max-w-4xl items-center bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-full hidden md:block">
          <img 
            src={login_img}
            alt="Chat Illustration" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="w-full md:w-1/2 p-8">
          
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
              Start your chat now
            </h2>
            <div className="space-y-4">
              <InputField
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              />
              <Button onClick={handleLogin}>Submit</Button>
            </div>
         
        </div>
      </div>
    </div>
  );
};

export default Login;
