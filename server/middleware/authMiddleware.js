// authMiddleware.js - Middleware for authentication & RBAC

const db = require("../config/db");

const authenticateUser = async (req, res, next) => {
    const { email, role } = req.body;

    try {
        const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        
        if (users.length === 0) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        req.user = users[0];
        next();
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: "Forbidden: Insufficient permissions" });
        }
        next();
    };
};

module.exports = { authenticateUser, authorizeRole };
