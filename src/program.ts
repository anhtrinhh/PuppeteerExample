import DBConnection from "./infras/dbconnection";


export default class Program {
    constructor(private readonly dbConnection: DBConnection) { }
    public async main(): Promise<void> {
        await this.dbConnection.open();
        const infos = await this.dbConnection.list("SELECT * FROM tbl_logininfo");
        await this.dbConnection.close();
        console.log(infos)
    }
}