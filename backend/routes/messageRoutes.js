const express = require("express");

const router = express.Router();

const supabase =
require("../config/supabase");


// ================= SEND MESSAGE =================

router.post("/send", async (req, res) => {

    try {

        const {
            sender_id,
            receiver_id,
            message
        } = req.body;

        const {
            data,
            error
        } = await supabase
            .from("messages")
            .insert([
                {
                    sender_id,
                    receiver_id,
                    message
                }
            ])
            .select();

        if (error) {

            console.log(error);

            return res
                .status(500)
                .json(error);
        }

        res.json({
            success: true,
            data
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message:
                "Server Error"
        });
    }
});


// ================= GET CHAT =================

router.get(
    "/chat/:user1/:user2",
    async (req, res) => {

        try {

            const {
                user1,
                user2
            } = req.params;

            const {
                data,
                error
            } = await supabase
                .from("messages")
                .select("*")
                .or(
                    `and(sender_id.eq.${user1},receiver_id.eq.${user2}),and(sender_id.eq.${user2},receiver_id.eq.${user1})`
                )
                .order(
                    "created_at",
                    {
                        ascending: true
                    }
                );

            if (error) {

                console.log(error);

                return res
                    .status(500)
                    .json(error);
            }

            res.json(data);

        } catch (err) {

            console.log(err);

            res.status(500).json({
                message:
                    "Server Error"
            });
        }
    }
);


module.exports = router;