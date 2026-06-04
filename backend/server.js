
const express = require("express");

const http = require("http");

const { Server } = require("socket.io");

const cors = require("cors");


const app = express();


// ================= CREATE SERVER =================
const server = http.createServer(app);


// ================= SOCKET IO =================
const allowedOrigins = [
  "http://localhost:3000",
  "https://chat-abyozc7c8-shalini-chatapp.vercel.app"
];

const io = require("socket.io")(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://chat-app-tau-sable-24.vercel.app"
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
});
const cors = require("cors");

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://chat-app-tau-sable-24.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());


// ================= ROUTES =================
const authRoutes =
require("./routes/authRoutes");

const messageRoutes =
require("./routes/messageRoutes");

const userRoutes =
require("./routes/userRoutes");


app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/messages",
    messageRoutes
);

app.use(
    "/api/users",
    userRoutes
);


// ================= SOCKET EVENTS =================
io.on("connection", (socket) => {

    console.log(
        "USER CONNECTED:",
        socket.id
    );


    // JOIN ROOM
    socket.on(
        "join_room",
        (userId) => {

            socket.join(
                userId.toString()
            );

            console.log(
                `USER ${userId} JOINED ROOM`
            );
        }
    );


    // SEND MESSAGE
    socket.on(
        "send_message",
        (data) => {

            console.log(
                "REALTIME MESSAGE:",
                data
            );

            io.to(
                data.receiver_id.toString()
            ).emit(
                "receive_message",
                data
            );
        }
    );
console.log("CORS ORIGIN CHECK");
console.log([
  "http://localhost:3000",
  "https://chat-app-tau-sable-24.vercel.app"
]);

    // DISCONNECT
    socket.on(
        "disconnect",
        () => {

            console.log(
                "USER DISCONNECTED"
            );
        }
    );
});


// ================= 404 =================
app.get("/", (req, res) => {
    res.json({
        message: "Chat App Backend Running 🚀"
    });
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

server.listen(PORT, "0.0.0.0", () => {
    console.log(`SERVER RUNNING ON PORT ${PORT} 🚀`);
});