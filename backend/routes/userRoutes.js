const express = require("express");

const router = express.Router();

const supabase =
require("../config/supabase");


// ================= TEST ROUTE =================

router.get("/test", (req, res) => {

    res.json({
        message: "User Route Working 🚀"
    });

});


// ================= GET ALL USERS =================

router.get("/all-users", async (req, res) => {

    try {

        const {
            data,
            error
        } = await supabase
            .from("users")
            .select(
                "id, username, email"
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

});


module.exports = router;