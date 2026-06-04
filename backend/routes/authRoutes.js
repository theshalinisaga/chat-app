const express = require("express");

const router = express.Router();

const db = require("../config/db");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");


// ================= REGISTER =================
router.post("/register", async (req, res) => {

    try {

        console.log(req.body);

        const { username, email, password } = req.body;

        if (!username || !email || !password) {

            return res.status(400).json({
                message: "All fields required"
            });
        }

        const checkSql = "SELECT * FROM users WHERE email = ?";

        db.query(checkSql, [email], async (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json(err);
            }

            if (result.length > 0) {

                return res.status(400).json({
                    message: "User already exists"
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const sql = `
                INSERT INTO users
                (username, email, password)
                VALUES (?, ?, ?)
            `;

            db.query(
                sql,
                [username, email, hashedPassword],
                (err, data) => {

                    if (err) {

                        console.log(err);

                        return res.status(500).json(err);
                    }

                    res.json({
                        message: "Register Success 🚀"
                    });
                }
            );
        });

    } catch (error) {

        console.log(error);

        res.status(500).json(error);
    }
});


// ================= LOGIN =================
router.post("/login", (req, res) => {

    try {

        console.log(req.body);

        const { email, password } = req.body;

        if (!email || !password) {

            return res.status(400).json({
                message: "Email and Password required"
            });
        }

        const sql = "SELECT * FROM users WHERE email = ?";

        db.query(sql, [email], async (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json(err);
            }

            if (result.length === 0) {

                return res.status(401).json({
                    message: "User not found"
                });
            }

            const user = result[0];

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
                    id: user.id
                },
                "secretkey",
                {
                    expiresIn: "1h"
                }
            );

            res.json({

                message: "Login Success 🚀",

                token,

                user: {

                    id: user.id,

                    username: user.username,

                    email: user.email
                }
            });
        });

    } catch (error) {

        console.log(error);

        res.status(500).json(error);
    }
});

module.exports = router;