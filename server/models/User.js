// const db = require("../config/db");

// const User = {
//     // Find user by email
//     findByEmail: (email) => {
//         return new Promise((resolve, reject) => {
//             const query = "SELECT * FROM users WHERE email = ?";
//             db.query(query, [email], (err, results) => {
//                 if (err) reject(err);
//                 resolve(results.length > 0 ? results[0] : null);
//             });
//         });
//     },

//     // Create a new user without hashing
//     createUser: (name, email, password, role) => {
//         return new Promise((resolve, reject) => {
//             const query = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
//             db.query(query, [name, email, password, role], (err, results) => {
//                 if (err) reject(err);
//                 resolve(results);
//             });
//         });
//     }
// };

// module.exports = User;

const db = require("../config/db");

const User = {
    findByEmail: (email) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    },

    createUser: (uniqueID, name, email, password, role) => {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO users (uniqueID, name, email, password, role) VALUES (?, ?, ?, ?, ?)";
            db.query(query, [uniqueID, name, email, password, role], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
};

module.exports = User;
