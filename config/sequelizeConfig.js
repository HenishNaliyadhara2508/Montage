import { Sequelize } from 'sequelize';
import dbConfig from './dbConfig.js';  // Import the dbConfig

// Create a Sequelize instance using the dbConfig
const sequelize = new Sequelize(
  dbConfig.database, 
  dbConfig.username, 
  dbConfig.password, 
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Export the Sequelize instance for use in other parts of the application
export default sequelize;
