import dotenv from 'dotenv';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import {Logger} from '../tools';

dotenv.config();
const logger = new Logger;
const NAMESPACE = 'ORM-Config';

const DATABASE_TYPE = process.env.DATABASE_TYPE || 'mysql';
const DATABASE_NAME = process.env.DATABASE_NAME || 'Type-ORM-Example';
const DATABASE_HOST = process.env.DATABASE_HOST || 'localhost';
const DATABASE_PORT = process.env.DATABASE_HOST || '3306';
const DATABASE_USERNAME = process.env.DATABASE_USERNAME || 'sa';
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || 'mrp@1404';

const mysqlConfig =   {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "test",
    "password": "test",
    "database": "test",
    "entities": ["src/entity/*.js"],
    "logging": true,
    "synchronize": true
  }
export class ORM{
    config :ConnectionOptions;
    mysqlConfig:any =   {
        "name":"mysql-connection",
        "type": "mysql",
        "host": "localhost",
        "port": 3306,
        "username": "root",
        "password": "mrp@1404",
        "database": "test",
        "entities": ["src/entities/*.ts"],
        "logging": true,
        "synchronize": true
      };
    mongodbConfig:any = {
        "name":"default",
        "type": "mongodb",
        "host": "localhost",
        "port": 27017,
        "database": "test",
        "useNewUrlParser": true,
        "useUnifiedTopology": true,
        "synchronize": true,
        "logging": true,
        "entities": ["src/entities/*.ts"]
    }
    constructor(databaseType:String, databaseConfig?:any){
        if(databaseConfig) this.config = databaseConfig;
        switch(databaseType){
            case 'mysql':
                this.config = this.mysqlConfig;
                break;
            case 'mongodb':
                this.config = this.mongodbConfig;
                break;
            default:            
                this.config = this.mongodbConfig;
        }
        process.env.DATABASE_TYPE = this.config.type;
    };  
}