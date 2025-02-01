
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { receiveMessage, setOnlineUsers } from '../Redux/chatSlice';
import socket from '../utils/socketClient';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { messages, onlineUsers } = useSelector((state) => state.chat);
  const username = useSelector((state) => state.authentication?.username || "Guest");
  const [message, setMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null); // State to track selected user

  useEffect(() => {
    if (username) {
      socket.emit('join', username); // Send username to the server
    }

    // Listen for incoming messages
    socket.on('receiveMessage', (message) => {
      dispatch(receiveMessage(message));
    });

    // Listen for updates to the online users list
    socket.on('onlineUsers', (users) => {
      dispatch(setOnlineUsers(users));
    });

    // Cleanup listeners on component unmount
    return () => {
      socket.off('receiveMessage');
      socket.off('onlineUsers');
    };
  }, [dispatch, username]);

  const handleSend = () => {
    if (message.trim() && username) {
      const messageData = {
        sender: username,
        text: message,
        timestamp: new Date(),
        recipient: selectedUser, // Include recipient for private messages
      };
      socket.emit('sendMessage', messageData); // Send message to the server
      setMessage(''); // Clear the input field
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user); // Set the selected user for private messaging
  };

  return (
    
    <div className="flex flex-col md:flex-row h-screen w-full bg-gray-100">
    {/* Sidebar */}
    <div className="w-full md:w-1/4 bg-white border-r border-gray-300 flex flex-col">
      <div className="p-4 font-bold text-lg border-b bg-green-600 text-white">Chats</div>
      <div className="flex-1 overflow-y-auto p-4">
        {onlineUsers.length === 0 ? (
          <div className="text-gray-500 text-center">No users online</div>
        ) : (
          onlineUsers.map((user, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-2 rounded-lg hover:bg-gray-200 border-b border-gray-300 cursor-pointer ${
                selectedUser === user ? 'bg-gray-200' : ''
              }`}
              onClick={() => handleUserSelect(user)} // Handle user selection
            >
              <div className="relative">
                <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold">
                  {user.charAt(0)}
                </div>
                <div className="h-3 w-3 rounded-full bg-green-500 absolute top-0 right-0 transform translate-x-1/2 translate-y-1/2 border-2 border-white"></div>
              </div>
              <span className="text-gray-700">{user === username ? `${user} (You)` : user}</span>
            </div>
          ))
        )}
      </div>
    </div>

    {/* Chat Section */}
    <div className="flex-1 flex flex-col h-full">
      <div className="p-4 bg-green-600 text-white font-bold text-lg flex justify-between">
        <span>Chat Room</span>
        <span className="text-sm font-normal">Logged in as {username}</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">
        {messages
          .filter(
            (msg) =>
              !msg.recipient || // Show global messages
              msg.recipient === username || // Show messages sent to the current user
              msg.sender === username // Show messages sent by the current user
          )
          .map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === username ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs p-3 rounded-lg shadow-md ${
                  msg.sender === username ? 'bg-green-500 text-white' : 'bg-white text-gray-800'
                }`}
              >
                {msg.sender !== username && <div className="text-xs font-semibold text-gray-600">{msg.sender}</div>}
                <div className="text-sm">{msg.text}</div>
                <div className="text-xs text-gray-500 text-right mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Input Field */}
      <div className="p-4 bg-white flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button onClick={handleSend} className="ml-2 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700">
          Send
        </button>
      </div>
    </div>
  </div>
  );
};

export default ChatPage;