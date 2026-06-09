const express = require("express");

const router = express.Router();

const supabase =
require("../config/supabase");

const bcrypt =
require("bcrypt");

const jwt =
require("jsonwebtoken");


// ================= REGISTER =================

router.post(
    "/register",
    async (req, res) => {

        try {

            const {
                username,
                email,
                password
            } = req.body;

            if (
                !username ||
                !email ||
                !password
            ) {

                return res
                    .status(400)
                    .json({
                        message:
                        "All fields required"
                    });
            }

            // CHECK USER

            const {
                data: existingUser,
                error: checkError
            } = await supabase
                .from("users")
                .select("*")
                .eq(
                    "email",
                    email
                );

            if (checkError) {

                console.log(
                    checkError
                );

                return res
                    .status(500)
                    .json(
                        checkError
                    );
            }

            if (
                existingUser.length > 0
            ) {

                return res
                    .status(400)
                    .json({
                        message:
                        "User already exists"
                    });
            }

            // HASH PASSWORD

            const hashedPassword =
                await bcrypt.hash(
                    password,
                    10
                );

            // INSERT USER

            const {
                error
            } = await supabase
                .from("users")
                .insert([
                    {
                        username,
                        email,
                        password:
                        hashedPassword
                    }
                ]);

            if (error) {

                console.log(
                    error
                );

                return res
                    .status(500)
                    .json(error);
            }

            res.json({

                message:
                "Register Success 🚀"

            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                message:
                "Server Error"
            });
        }
    }
);


// ================= LOGIN =================
router.post("/login", async (req, res) => {

    try {

        console.log("LOGIN START");

        const { email, password } = req.body;

        console.log("EMAIL:", email);

        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", email);

        console.log("SUPABASE DATA:", data);
        console.log("SUPABASE ERROR:", error);

        if (error) {
            return res.status(500).json(error);
        }

        if (data.length === 0) {
            console.log("USER NOT FOUND");
            return res.status(401).json({
                message: "User not found"
            });
        }

        const user = data[0];

        console.log("USER FOUND:", user.email);

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        console.log("PASSWORD MATCH:", isMatch);

        if (!isMatch) {
            return res.status(401).json({
                message: "Wrong password"
            });
        }

        console.log("LOGIN SUCCESS");

        res.json({
            message: "Login Success"
        });

    } catch (error) {

        console.log("LOGIN CRASH:", error);

        res.status(500).json(error);
    }
});

module.exports = router;