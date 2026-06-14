const express = require("express");
const router = express.Router();

const supabase = require("../config/supabase");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ================= REGISTER =================
router.post("/register", async (req, res) => {

    try {

        const { username, email, password } = req.body;

        // HASH PASSWORD
        const hashedPassword =
            await bcrypt.hash(password, 10);

console.log("ORIGINAL:", password);
console.log("HASHED:", hashedPassword);
        // SAVE HASHED PASSWORD
        const { data, error } = await supabase
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
            return res.status(500).json(error);
        }

        return res.status(201).json({
            success: true,
            message: "Register Success 🚀"
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            message: "Server Error"
        });
    }
});


// ================= LOGIN =================

router.post("/login", async (req, res) => {

    try {

        console.log("LOGIN START");

        const { email, password } = req.body;

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

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Wrong password"
            });
        }

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

        return res.status(500).json({
            message: "Server Error"
        });
    }
});

module.exports = router;