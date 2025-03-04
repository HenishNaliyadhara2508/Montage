import dotenv from 'dotenv';

dotenv.config();


const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'your_password', // Default to 'your_password' if not provided
  database: process.env.DB_NAME || 'mydatabase', // Default to 'mydatabase' if not provided
  port: process.env.DB_PORT || 5432,  // Default PostgreSQL port
  dialect: 'postgres',
  pool: {
    max: 5,  // Max number of connections in the pool
    min: 0,  // Min number of connections in the pool
    acquire: 30000,  // Max time (in ms) for connection acquisition
    idle: 10000,  // Max time (in ms) a connection can remain idle
  },
};

export default dbConfig;
