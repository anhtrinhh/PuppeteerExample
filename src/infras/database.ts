import sqlite3 = require('sqlite3');
sqlite3.verbose();
const db = new sqlite3.Database('./resources/app.db3');

export const LoginInfoTableName = "tbl_logininfo"

db.serialize(() => {
    // Create a User table
    db.run(`
        CREATE TABLE IF NOT EXISTS ${LoginInfoTableName} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            host TEXT,
            username TEXT,
            password TEXT,
            createdat DATETIME
        )
    `);

    db.get("SELECT name FROM sqlite_master WHERE type='index' AND name='idx_logininfo_host'", function(err, row) {
        if (!row) {
            db.run(`CREATE INDEX idx_logininfo_host ON ${LoginInfoTableName}(host)`);
        }
    });
});

export default db;