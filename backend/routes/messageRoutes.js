const express = require("express");

const router = express.Router();

const db = require("../config/db");


// ================= SEND MESSAGE =================
router.post("/send", (req, res) => {

    const {
        sender_id,
        receiver_id,
        message
    } = req.body;


    console.log(req.body);


    if (
        !sender_id ||
        !receiver_id ||
        !message
    ) {

        return res.status(400).json({

            message:
            "All fields required"
        });
    }


    const sql = `
        INSERT INTO messages
        (sender_id, receiver_id, message)
        VALUES (?, ?, ?)
    `;


    db.query(
        sql,
        [
            sender_id,
            receiver_id,
            message
        ],

        (err, result) => {

            if (err) {

                console.log(err);

                return res
                .status(500)
                .json(err);
            }

            res.json({

                message:
                "Message Sent 🚀"
            });
        }
    );
});


// ================= GET MESSAGES =================
router.get("/get", (req, res) => {

    const {
        sender_id,
        receiver_id
    } = req.query;


    const sql = `

    SELECT * FROM messages

    WHERE

    (sender_id = ? AND receiver_id = ?)

    OR

    (sender_id = ? AND receiver_id = ?)

    ORDER BY created_at ASC

    `;


    db.query(

        sql,

        [
            sender_id,
            receiver_id,
            receiver_id,
            sender_id
        ],

        (err, result) => {

            if (err) {

                console.log(err);

                return res
                .status(500)
                .json(err);
            }

            res.json(result);
        }
    );
});


module.exports = router;