const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const router = express.Router();

// Function to generate a unique alphanumeric ID based on role
function generateUniqueID(role) {
    const prefix = role.toLowerCase() === "patient" ? "P" : "D";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let uniquePart = "";
    
    for (let i = 0; i < 6; i++) { // Generate a 6-character alphanumeric string
        uniquePart += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    return `${prefix}${uniquePart}`; // Example: P4Z8X2A or D7B5C9D
}

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        const user = await User.findByEmail(email);
        if (!user || user.password !== password) { // No bcrypt used
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        res.json({ success: true, message: "Login successful", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});


router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already registered" });
        }

        const uniqueID = generateUniqueID(role); // Generate unique alphanumeric ID

        // Insert user with uniqueID
        await User.createUser(uniqueID, name, email, password, role);

        res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

module.exports = router;
