import { io } from "socket.io-client";

const socketClient = io('https://real-time-chat-app-server-3lxb.onrender.com'); 

export default socketClient