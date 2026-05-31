import { io } from "socket.io-client";

const socket = io("https://chat-app-backend-3qjv.onrender.com");

export default socket;