export default interface DBConnection {
    get<T>(sql: string, ...params: any[]): Promise<T | undefined>;
    list<T>(sql: string, ...params: any[]): Promise<T[]>;
    exec(sql: string, ...params: any[]): Promise<void>;
}