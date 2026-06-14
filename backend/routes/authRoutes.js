const express = require("express");
const router = express.Router();

const supabase = require("../config/supabase");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// ================= REGISTER =================

router.post("/register", async (req, res) => {

    console.log("REGISTER API HIT 🚀");
    console.log(req.body);

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

            return res.status(400).json({
                message: "All fields required"
            });
        }

        // CHECK USER EXISTS

        const {
            data: existingUser,
            error: checkError
        } = await supabase
            .from("users")
            .select("*")
            .eq("email", email);

        if (checkError) {

            console.log(checkError);

            return res.status(500).json(checkError);
        }

        if (existingUser.length > 0) {

            return res.status(400).json({
                message: "User already exists"
            });
        }

        // HASH PASSWORD

        const hashedPassword =
            await bcrypt.hash(password, 10);

        // INSERT USER

        const {
            data,
            error
        } = await supabase
            .from("users")
            .insert([
                {
                    username,
                    email,
                    password: hashedPassword
                }
            ])
            .select();

        if (error) {

            console.log(error);

            return res.status(500).json(error);
        }

        res.status(201).json({
            success: true,
            message: "Register Success 🚀",
            user: data[0]
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
});


// ================= LOGIN =================

router.post("/login", async (req, res) => {

    try {

        console.log("LOGIN START");

        const {
            email,
            password
        } = req.body;

        const {
            data,
            error
        } = await supabase
            .from("users")
            .select("*")
            .eq("email", email);

        if (error) {

            console.log(error);

            return res.status(500).json(error);
        }

        if (!data || data.length === 0) {

            return res.status(401).json({
                message: "User not found"
            });
        }

        const user = data[0];

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {

            return res.status(401).json({
                message: "Wrong password"
            });
        }

        // JWT TOKEN

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        console.log("LOGIN SUCCESS");

        return res.status(200).json({

            success: true,

            message: "Login Success 🚀",

            token,

            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }

        });

    } catch (error) {

        console.log("LOGIN CRASH:", error);

        res.status(500).json({
            message: "Server Error"
        });
    }
});

module.exports = router;