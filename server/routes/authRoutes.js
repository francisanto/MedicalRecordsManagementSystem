const express = require("express");
const jwt = require("jsonwebtoken"); // Kept JWT for authentication
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

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Database error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const user = results[0];

        // No bcrypt, just direct comparison
        if (password !== user.password) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ success: true, user, token });
    });
});

module.exports = router;
