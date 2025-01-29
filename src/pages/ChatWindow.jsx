import { Send } from 'lucide-react'
import React from 'react'

const ChatWindow = () => {
  return (
    <div className="flex-1 flex flex-col">
    <div className="p-4 border-b bg-white">
      <div className="flex items-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white
             ${selectedUser.avatar.color}
             `}>
          {selectedUser.avatar.initials}
        </div>
        <h2 className="ml-3 font-semibold">{selectedUser.username}</h2>
      </div>
    </div>

    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      {messages
        .filter(msg => 
          (msg.sender === currentUser.username && msg.to === selectedUser.username) ||
          (msg.sender === selectedUser.username && msg.to === currentUser.username)
        )
        .map((msg, index) => (
          <div
            key={index}
            className={`flex mb-4 ${msg.sender === currentUser.username ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                msg.sender === currentUser.username
                  ? 'bg-blue-500 text-white'
                  : 'bg-white'
              }`}
            >
              <p>{msg.content}</p>
              <p className={`text-xs mt-1 ${
                msg.sender === currentUser.username
                  ? 'text-blue-100'
                  : 'text-gray-500'
              }`}>
                {new Date(msg.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      <div ref={messagesEndRef} />
    </div>

    <form onSubmit={handleSend} className="p-4 bg-white border-t">
      <div className="flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  </div>
  )
}

export default ChatWindow