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
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbCreateConnection = void 0;
const typeorm_1 = require("typeorm");
const config_1 = require("../config");
const tools_1 = require("../tools");
const logger = new tools_1.Logger;
const NAMESPACE = 'dbCreateConnection-tool';
const dbCreateConnection = (databaseType) => __awaiter(void 0, void 0, void 0, function* () {
    const databaseORM = new config_1.ORM(databaseType);
    let connection;
    try {
        connection = yield (0, typeorm_1.createConnection)(databaseORM.config);
        // console.log(`${databaseORM.config.type} Database connection success. Host: ${databaseORM.config.host} Port: ${databaseORM.config.port}`);
        return connection;
    }
    catch (err) {
        logger.error(NAMESPACE, err.message, err);
    }
    return null;
});
exports.dbCreateConnection = dbCreateConnection;
