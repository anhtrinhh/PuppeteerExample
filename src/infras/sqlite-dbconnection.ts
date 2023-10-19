import * as sqlite3 from "sqlite3";
import DBConnection from "./dbconnection";

export default class SQLiteDBConnection implements DBConnection {
    private db?: sqlite3.Database;

    constructor(private readonly connectionString: string) { }

    open() {
        return new Promise<void>(resolve => {
            this.db = new sqlite3.Database(this.connectionString);
            resolve();
        });
    }

    close() {
        if (this.db) {
            return new Promise<void>((resolve, reject) => {
                this.db.close(err => {
                    if (err) {
                        reject(err);
                    } else {
                        this.db = undefined;
                        resolve();
                    }
                });
            });
        }
    }

    get<T>(sql: string, ...params: any[]): Promise<T | null> {
        return new Promise<T>((resolve, reject) => {
            if (this.db) {
                this.db.get<T>(sql, params, (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row);
                    }
                });
            } else {
                return resolve(null);
            }
        });
    }

    list<T>(sql: string, ...params: any[]): Promise<T[]> {
        return new Promise<T[]>((resolve, reject) => {
            if (this.db) {
                this.db.all<T>(sql, params, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            } else {
                resolve([]);
            }
        });
    }

    exec(sql: string, ...params: any[]): Promise<void> {
        if (this.db) {
            return new Promise<void>((resolve, reject) => {
                this.db.run(sql, params, err => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        }
    }
}