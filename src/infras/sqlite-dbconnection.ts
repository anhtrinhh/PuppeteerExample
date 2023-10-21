import * as sqlite3 from "sqlite3";
import DBConnection from "./dbconnection";

export default class SQLiteDBConnection implements DBConnection {

    constructor(private readonly connectionString: string) { }

    open() {
        return new sqlite3.Database(this.connectionString);
    }

    close(db: sqlite3.Database) {
        return new Promise<void>((resolve, reject) => {
            db.close(err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    get<T>(sql: string, ...params: any[]): Promise<T | undefined> {
        return new Promise<T>((resolve, reject) => {
            const db = this.open();
            db.get<T>(sql, params, async (err, row) => {
                await this.close(db);
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    list<T>(sql: string, ...params: any[]): Promise<T[]> {
        return new Promise<T[]>((resolve, reject) => {
            const db = this.open();
            db.all<T>(sql, params, async (err, rows) => {
                await this.close(db);
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    exec(sql: string, ...params: any[]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const db = this.open();
            db.run(sql, params, async err => {
                await this.close(db);
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}