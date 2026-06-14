require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
const server = http.createServer(app);


// ================= ALLOWED ORIGINS =================

const allowedOrigins = [
  "http://localhost:3000",
  "https://chat-app-tau-sable-24.vercel.app",

];


// ================= SOCKET.IO =================

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


// ================= MIDDLEWARE =================
app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://chat-app-tau-sable-24.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());


// ================= ROUTES =================

const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


// ================= ROOT =================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Chat App Backend Running 🚀"
  });
});


// ================= HEALTH CHECK =================

app.get("/health", (req, res) => {
  res.json({
    success: true,
    status: "Server Running"
  });
});


// ================= SOCKET EVENTS =================

io.on("connection", (socket) => {

  console.log(
    "USER CONNECTED:",
    socket.id
  );

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

  socket.on(
    "disconnect",
    () => {

      console.log(
        "USER DISCONNECTED:",
        socket.id
      );
    }
  );
});


// ================= START =================

const PORT =
process.env.PORT || 5000;

server.listen(
  PORT,
  "0.0.0.0",
  () => {

    console.log(
      `SERVER RUNNING ON PORT ${PORT} 🚀`
    );

    console.log(
      "SUPABASE URL:",
      process.env.SUPABASE_URL
        ? "FOUND ✅"
        : "MISSING ❌"
    );

    console.log(
      "SUPABASE KEY:",
      process.env.SUPABASE_ANON_KEY
        ? "FOUND ✅"
        : "MISSING ❌"
    );
  }
);