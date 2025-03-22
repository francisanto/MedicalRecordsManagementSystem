// authRoutes.js - Handles user authentication

const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/login", async (req, res) => {
    const { email, password, role } = req.body;
    
    try {
        const [rows] = await db.query("SELECT * FROM users WHERE email = ? AND role = ?", [email, role]);
        
        if (rows.length > 0 && rows[0].password === password) {
            res.json({ success: true, role: rows[0].role });
        } else {
            res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;
