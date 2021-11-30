import { Connection, createConnection } from 'typeorm';
import {ORM}  from '../config';
import {Logger} from '../tools';

const logger = new Logger;
const NAMESPACE = 'dbCreateConnection-tool'
export const dbCreateConnection = async (databaseType : String): Promise<Connection | null> => {
  const databaseORM = new ORM(databaseType);
  let connection : Connection;
  try{
    connection = await createConnection(databaseORM.config);
    console.log(`${connection.options.type} Database connection success.`);
    return connection;
  } catch (err:any) {
    logger.error(NAMESPACE, err.message,err);
  }
  return null;
};
