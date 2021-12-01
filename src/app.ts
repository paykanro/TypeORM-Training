import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import { Logger, errorHandler, dbCreateConnection } from './tools';
import { ServerConfig }  from './config';
import routes from './routes';

const NAMESPACE = 'Server';

const app = express();
const logger = new Logger;

/** Log communication  */
app.use((req, res, next) => {
    // /** Log the request */
    // logger.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    // res.on('finish', () => {
    //     /** Log the response */
    //     logger.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    // });    
    next();
});

/** Parse the body of the request */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
app.use('/', routes);


/** Error handling */
app.use(errorHandler);
app.use((req, res, next) => {
    const error = new Error('Not found');
    res.status(404).json({
        message: error.message
    });
});

/** Initiate Server And Running via Establishing Database Connection*/
const serverConfig = new ServerConfig();
const httpServer = http.createServer(app);
httpServer.on('error', serverConfig.onError);
httpServer.listen(serverConfig.port, () => logger.info(NAMESPACE, `Server is running on ${serverConfig.host}:${serverConfig.port}`));

(async () => {await dbCreateConnection('mysql');})(); /** Connect to the database */