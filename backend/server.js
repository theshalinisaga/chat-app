
const express = require("express");

const http = require("http");

const { Server } = require("socket.io");

const cors = require("cors");


const app = express();


// ================= CREATE SERVER =================
const server = http.createServer(app);


// ================= SOCKET IO =================
const io = new Server(server, {

    cors: {

        origin: "http://localhost:3000",

        methods: ["GET", "POST"]
    }
});


// ================= MIDDLEWARE =================
app.use(cors());

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
app.use((req, res) => {

    res.status(404).json({

        message:
        "Route Not Found ❌"
    });
});


// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

server.listen(PORT, "0.0.0.0", () => {
    console.log(`SERVER RUNNING ON PORT ${PORT} 🚀`);
});