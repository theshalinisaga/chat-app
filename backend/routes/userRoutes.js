const express = require("express");

const router = express.Router();

const db = require("../config/db");


// TEST ROUTE
router.get("/test", (req, res) => {

    res.json({
        message: "User Route Working 🚀"
    });
});


// GET ALL USERS
router.get("/all-users", (req, res) => {

    const sql = `
        SELECT
        id,
        username,
        email
        FROM users
    `;

    db.query(sql, (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json(err);
        }

        res.json(result);
    });
});

module.exports = router;