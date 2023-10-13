import * as env from './env.js';
import {Sequelize} from 'sequelize';

/**
 * A tuple of hostnames that indicate that the database is running locally.
 */
const localHosts = [
  'localhost',
  '127.0.0.1',
  'host.docker.internal'
] as const;

/**
 * Creates a database connection using the environment variables. If the
 * environment variables are not set, then a SQLite in-memory database is used.
 * @returns {Sequelize} A Sequelize instance
 */
function createDatabaseConnection(): Sequelize {
  if (localHosts.some(host => env.DB_HOSTNAME.includes(host))) {
    return new Sequelize(env.DB_NAME, env.DB_USERNAME, env.DB_PASSWORD, {
      host: env.DB_HOSTNAME,
      port: env.DB_PORT,
      dialect: 'postgres',
      logging: msg => console.debug(msg),
    });
  }

  const connection = "sqlite::memory:";
  console.log(`Connecting to database: ${connection}`);
  const sequelize = new Sequelize(connection, {logging: msg => console.debug(msg)});
  return sequelize;
}

/**
 * The database connection.
 */
export const sequelize = createDatabaseConnection();