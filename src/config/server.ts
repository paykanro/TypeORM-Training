import dotenv from 'dotenv';
dotenv.config();

const NAMESPACE = 'Server-Config';

const SERVER_HOST = process.env.SERVER_HOST || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 6000;
export class ServerConfig{
    host: string;
    port: number;
    constructor(host:string = SERVER_HOST, port: number = +SERVER_PORT){
        this.host = host;
        this.port = port;
    };
    onError = (error:any):void => {
        if (error.syscall !== 'listen') {
            throw error;
          }
        
          let bind = typeof this.port === 'string'
            ? 'Pipe ' + this.port
            : 'Port ' + this.port;
        
          // handle specific listen errors with friendly messages
          switch (error.code) {
            case 'EACCES':
              console.error(bind + ' requires elevated privileges');
              process.exit(1);
              break;
            case 'EADDRINUSE':
              console.error(bind + ' is already in use');
              process.exit(1);
              break;
            default:
              throw error;
          }
    }
}