export default interface DBConnection {
    open(): Promise<void>;
    close(): Promise<void>;
    get<T>(sql: string, ...params: any[]): Promise<T | null>;
    list<T>(sql: string, ...params: any[]): Promise<T[]>;
    exec(sql: string, ...params: any[]): Promise<void>;
}