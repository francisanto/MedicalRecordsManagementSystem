const express = require("express");
const User = require("../models/User");  // Ensure correct import
const jwt = require("jsonwebtoken"); // For authentication
const db = require("../config/db"); // MySQL connection
const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }

        // Store password as plain text (NOT RECOMMENDED FOR PRODUCTION)
        await User.createUser(name, email, password, role);

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
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

        // Compare passwords directly (since no hashing)
        if (password !== user.password) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ success: true, role: user.role, token });
    });
});

module.exports = router;
