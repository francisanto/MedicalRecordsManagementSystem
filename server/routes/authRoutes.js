const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../config/db"); // MySQL connection
const router = express.Router();

router.post("/register", (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if user already exists
    const queryCheck = "SELECT * FROM users WHERE email = ?";
    db.query(queryCheck, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Database error" });
        }
        if (results.length > 0) {
            return res.status(400).json({ success: false, message: "Email already registered" });
        }

        // Insert user with plain text password (⚠️ NOT SECURE for production)
        const queryInsert = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
        db.query(queryInsert, [name, email, password, role], (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: "Failed to register user" });
            }

            res.status(201).json({ success: true, message: "User registered successfully" });
        });
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

        // Compare passwords (plain text)
        if (password !== user.password) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ success: true, role: user.role, token });
    });
});

module.exports = router;
