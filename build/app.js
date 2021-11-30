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
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const tools_1 = require("./tools");
const config_1 = require("./config");
const dbCreateConnection_1 = require("./tools/dbCreateConnection");
const routes_1 = __importDefault(require("./routes"));
const NAMESPACE = 'Server';
const app = (0, express_1.default)();
const logger = new tools_1.Logger;
/** Log communication  */
app.use((req, res, next) => {
    /** Log the request */
    logger.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        /** Log the response */
        logger.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });
    next();
});
/** Parse the body of the request */
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
/** Rules of our API */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
/** Routing */
app.use('/', routes_1.default);
/** Error handling */
app.use((req, res, next) => {
    const error = new Error('Not found');
    res.status(404).json({
        message: error.message
    });
});
/** Initiate Server And Running via Establishing Database Connection*/
const serverConfig = new config_1.ServerConfig();
const httpServer = http_1.default.createServer(app);
httpServer.on('error', serverConfig.onError);
httpServer.listen(serverConfig.port, () => logger.info(NAMESPACE, `Server is running on ${serverConfig.host}:${serverConfig.port}`));
(() => __awaiter(void 0, void 0, void 0, function* () { yield (0, dbCreateConnection_1.dbCreateConnection)('mongodb'); }))(); /** Connect to the database */
