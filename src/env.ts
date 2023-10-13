/**
 * @fileoverview This file contains all the environment variables used in the
 * application.
 */

/**
 * This object contains all the environment variables used in the application
 * and helps to ensure that they are all set. If any of the variables are not
 * set here, the application will throw an error.
 * TODO: Remove default values. They are only here for example purposes.
 */
const env = {
  // Database globals
  DB_HOSTNAME: process.env.DB_HOST || '',
  DB_PORT: Number(process.env.DB_PORT || 5432),
  DB_NAME: process.env.DB_NAME || 'postgres',
  DB_USERNAME: process.env.DB_USER || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD || 'postgres',

  // gRPC globals
  PROTO_PATH: process.env.PROTO_PATH || `${process.cwd()}/proto`,

  // Application globals
  HOSTNAME: process.env.HOSTNAME || 'localhost',
  PORT: process.env.PORT || 3000,
} as const;

const invalid: string[] = [];

Object.entries(env).forEach(([key, value]) => {
  if (value === undefined)
    invalid.push(key);
});

if (invalid.length > 0) {
  throw new Error(`The following environment variables are not set: ${invalid.join(', ')}`);
}

export const {
  DB_HOSTNAME,
  DB_PORT,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  PROTO_PATH,
  HOSTNAME,
  PORT
} = env;