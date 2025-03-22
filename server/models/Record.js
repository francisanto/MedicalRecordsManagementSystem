// Record.js - Medical Record Model

const db = require("../config/db");

class Record {
    static async addRecord(patientId, diagnosis, treatment) {
        await db.query("INSERT INTO records (patient_id, diagnosis, treatment) VALUES (?, ?, ?)", [patientId, diagnosis, treatment]);
    }

    static async getRecordsByPatient(patientId) {
        const [records] = await db.query("SELECT * FROM records WHERE patient_id = ?", [patientId]);
        return records;
    }
}

module.exports = Record;
