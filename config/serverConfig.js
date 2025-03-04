import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

const serverConfig = {
  host: process.env.SERVER_HOST || 'localhost',  // Default to 'localhost' if not provided
  port: process.env.SERVER_PORT || 3000,        // Default to 3000 if not provided
};

export default serverConfig;
