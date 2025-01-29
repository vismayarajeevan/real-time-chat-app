import { MessageCircle } from 'lucide-react';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';



const LoginPage = () => {
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (username.trim()) {
        const avatar = generateAvatar(username);
        const user = { username, avatar };
        dispatch(setCurrentUser(user));
        socket.emit('user:join', user);
        onLogin();
      }
    };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <div className="flex items-center justify-center mb-8">
        <MessageCircle className="w-12 h-12 text-blue-500" />
      </div>
      <h1 className="text-2xl font-bold text-center mb-6">Welcome to Chat App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Join Chat
        </button>
      </form>
    </div>
  </div>
  )
}

export default LoginPage