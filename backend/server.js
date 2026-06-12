require("dotenv").config();
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
  "https://chat-app-tau-sable-24.vercel.app",
  "https://chat-abyozc7c8-shalini-chatapp.vercel.app"
];

const io = require("socket.io")(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://chat-lje6aq0v8-shalini-chatapp.vercel.app/",
      "https://chat-app-tau-sable-24.vercel.app"
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://chat-lje6aq0v8-shalini-chatapp.vercel.app/",
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

app.get("/db-test", (req,res)=>{
     res.send("DB Test Route Working 🚀");

    db.query(
        "SELECT 1",
        (err,result)=>{

            if(err){
                return res.json({
                    success:false,
                    error:err.message
                });
            }

            res.json({
                success:true,
                result
            });
        }
    );

});
const db = require("./config/db");

app.get("/db-test", (req, res) => {

    db.query(
        "SELECT 1",
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                success: true,
                result
            });
        }
    );
});
console.log("HOST:", process.env.DB_HOST);
console.log("USER:", process.env.DB_USER);
console.log("DB:", process.env.DB_NAME);
// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

server.listen(PORT, "0.0.0.0", () => {
    console.log(`SERVER RUNNING ON PORT ${PORT} 🚀`);
});