"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORM = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const tools_1 = require("../tools");
dotenv_1.default.config();
const logger = new tools_1.Logger;
const NAMESPACE = 'ORM-Config';
const DATABASE_TYPE = process.env.DATABASE_TYPE || 'mongodb';
const DATABASE_NAME = process.env.DATABASE_NAME || 'Type-ORM-Example';
const DATABASE_HOST = process.env.DATABASE_HOST || 'localhost';
const DATABASE_PORT = process.env.DATABASE_HOST || '3306';
const DATABASE_USERNAME = process.env.DATABASE_USERNAME || 'sa';
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || 'mrp@1404';
const mysqlConfig = {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "test",
    "password": "test",
    "database": "test",
    "entities": ["src/entity/*.js"],
    "logging": true,
    "synchronize": true
};
class ORM {
    constructor(databaseType, databaseConfig) {
        this.mysqlConfig = {
            "name": "mysql-connection",
            "type": "mysql",
            "host": "localhost",
            "port": 3306,
            "username": "test",
            "password": "test",
            "database": "test",
            "entities": ["src/entities/*.ts"],
            "logging": true,
            "synchronize": true
        };
        this.mongodbConfig = {
            "name": "default",
            "type": "mongodb",
            "host": "localhost",
            "port": 27017,
            "database": "test",
            "useNewUrlParser": true,
            "useUnifiedTopology": true,
            "synchronize": true,
            "logging": true,
            "entities": ["src/entities/*.ts"]
        };
        if (databaseConfig)
            this.config = databaseConfig;
        switch (databaseType) {
            case 'mysql':
                this.config = this.mysqlConfig;
                break;
            case 'mongodb':
                this.config = this.mongodbConfig;
                break;
            default:
                this.config = this.mongodbConfig;
        }
    }
    ;
    createDatabaseConncetion() {
        () => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('over');
                const conn = yield (0, typeorm_1.createConnection)(this.config);
                // console.log(`'${this.config.type}' Database connection success. Database Host: '${this.config.host}' Database: '${this.config.port}'`);
            }
            catch (err) {
                logger.error(NAMESPACE, err.message, err);
            }
            return null;
        });
    }
}
exports.ORM = ORM;
