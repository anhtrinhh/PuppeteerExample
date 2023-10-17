import db, { LoginInfoTableName } from '../infras/database';

interface LoginInfo {
    id: number;
    host: string;
    username: string;
    password: string;
    createdat: Date;
}

export const LoginInfo = {
    newInstance: (host: string, username: string, password: string): LoginInfo => {
        return {
            host,
            username,
            password,
            id: 0,
            createdat: new Date()
        }
    },
    insert: (loginInfo: LoginInfo): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            const { host, username, password, createdat } = loginInfo;
            db.run(`INSERT INTO ${LoginInfoTableName}(host, username, password, createdat) VALUES (?, ?, ?, ?)`, [host, username, password, createdat], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    },
    insertRange: (loginInfos: LoginInfo[]): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            if (loginInfos.length > 0) {
                const placeholders = loginInfos.map(() => '(?, ?, ?, ?)').join(', ');
                const values = loginInfos.map((loginInfo) => [loginInfo.host, loginInfo.username, loginInfo.password, loginInfo.createdat]).flat();
                const query = `INSERT INTO ${LoginInfoTableName} (host, username, password, createdat) VALUES ${placeholders}`;
                db.run(query, values, function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            } else {
                resolve();
            }
        });
    },
    selectByHost: (host: string): Promise<LoginInfo[]> => {
        return new Promise<LoginInfo[]>((resolve, reject) => {
            db.all<LoginInfo>(`SELECT * FROM ${LoginInfoTableName} WHERE host = ?`, [host], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    },
    delete: (id: number): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            db.run(`DELETE FROM ${LoginInfoTableName} WHERE id = ?`, [id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    },
    deleteByIds: (ids: number[]): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            if (ids.length > 0) {
                db.run(`DELETE FROM users WHERE id IN (${ids.join(', ')})`, function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            } else {
                resolve();
            }
        });
    },
    deleteByHost: (host: string): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            db.run(`DELETE FROM ${LoginInfoTableName} WHERE host = ?`, [host], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}