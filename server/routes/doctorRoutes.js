// doctorRoutes.js - Doctors adding records

const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/addRecord", async (req, res) => {
    const { patientId, diagnosis, treatment } = req.body;

    try {
        await db.query("INSERT INTO records (patient_id, diagnosis, treatment) VALUES (?, ?, ?)", [patientId, diagnosis, treatment]);
        res.json({ success: true, message: "Record added successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to add record" });
    }
});

module.exports = router;
