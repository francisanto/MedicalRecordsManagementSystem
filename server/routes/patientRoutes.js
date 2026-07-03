// patientRoutes.js - Fetching patient records

const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/records", async (req, res) => {
    try {
        const [records] = await db.query("SELECT * FROM records");
        res.json(records);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch records" });
    }
});

module.exports = router;
