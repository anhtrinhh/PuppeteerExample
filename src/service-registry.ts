import services from './service-collection';
import Configurations from './configurations';
import SQLiteDBConnection from './infras/sqlite-dbconnection';
import Program from './program';

const configurations = services.getService(Configurations);

services.addTransient(SQLiteDBConnection, () => new SQLiteDBConnection(configurations.dbConnStr));
services.addSingletonWithDependencies(Program, SQLiteDBConnection);