const express = require("express");
const db = require("../config/db"); // MySQL connection
const router = express.Router();

router.post("/register", (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.json({ success: false, message: "All fields are required" });
    }

    const query = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    db.query(query, [name, email, password, role], (err, result) => {
        if (err) {
            return res.json({ success: false, message: "Database error" });
        }
        res.json({ success: true, message: "Account created successfully" });
    });
});

module.exports = router;
