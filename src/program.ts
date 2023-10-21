import DBConnection from "./infras/dbconnection";


export default class Program {
    constructor(private readonly dbConnection: DBConnection) { }
    public async main(): Promise<void> {
        const infos = await this.dbConnection.list("SELECT * FROM tbl_logininfo");
        console.log(infos)
    }
}