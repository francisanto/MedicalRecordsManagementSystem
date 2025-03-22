// adminRoutes.js - Admin functionalities

const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/add-doctor", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        await db.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'doctor')", [name, email, password]);
        res.json({ success: true, message: "Doctor added successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to add doctor" });
    }
});

router.post("/add-patient", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        await db.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'patient')", [name, email, password]);
        res.json({ success: true, message: "Patient added successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to add patient" });
    }
});

module.exports = router;
