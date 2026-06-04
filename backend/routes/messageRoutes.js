const express = require("express");

const router = express.Router();

const db = require("../config/db");


// ================= SEND MESSAGE =================
router.post("/send", (req, res) => {
    const { sender_id, receiver_id, message } = req.body;

    const sql = `
        INSERT INTO messages (sender_id, receiver_id, message)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [sender_id, receiver_id, message], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true });
    });
});


// ================= GET MESSAGES =================
router.get("/chat/:user1/:user2", (req, res) => {
    const { user1, user2 } = req.params;

    const sql = `
        SELECT * FROM messages
        WHERE (sender_id = ? AND receiver_id = ?)
        OR (sender_id = ? AND receiver_id = ?)
        ORDER BY created_at ASC
    `;

    db.query(sql, [user1, user2, user2, user1], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});


module.exports = router;