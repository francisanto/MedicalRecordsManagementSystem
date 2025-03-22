// User.js - User Model

const db = require("../config/db");

class User {
    static async findByEmail(email) {
        const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        return users.length > 0 ? users[0] : null;
    }

    static async createUser(name, email, password, role) {
        await db.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", [name, email, password, role]);
    }
}

module.exports = User;
