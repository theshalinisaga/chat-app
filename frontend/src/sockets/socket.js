import { io } from "socket.io-client";

const socket = io(
    "https://chat-appbackend-u7x3.onrender.com",
    {
        transports: ["websocket"],
        withCredentials: true
    }
);

export default socket;