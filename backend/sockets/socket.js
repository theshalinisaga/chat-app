module.exports = (io) => {

    io.on("connection", (socket) => {

        console.log("✅ USER CONNECTED:", socket.id);

        // =========================
        // JOIN ROOM
        // =========================
        socket.on("join_room", (userId) => {

            socket.join(userId);

            console.log("🟢 JOINED ROOM:", userId);
        });

        // =========================
        // SEND MESSAGE
        // =========================
        socket.on("send_message", (data) => {

            console.log("📩 MESSAGE RECEIVED:", data);

            io.to(data.receiver_id).emit(
                "receive_message",
                data
            );
        });

        // =========================
        // TYPING
        // =========================
        socket.on("typing", (data) => {

            io.to(data.receiver_id).emit(
                "show_typing",
                {
                    sender_id: data.sender_id
                }
            );
        });

        // =========================
        // DISCONNECT
        // =========================
        socket.on("disconnect", () => {

            console.log("🔴 USER DISCONNECTED");
        });

    });
};