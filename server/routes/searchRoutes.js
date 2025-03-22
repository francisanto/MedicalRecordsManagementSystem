// searchRoutes.js - Search functionality

const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", async (req, res) => {
    const { query } = req.query;

    try {
        const [results] = await db.query("SELECT * FROM users WHERE name LIKE ?", [`%${query}%`]);
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: "Search failed" });
    }
});

module.exports = router;
