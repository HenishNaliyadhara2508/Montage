import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/sequelizeConfig.js"; // Import the Sequelize instance from dbConfig
import SubStyleTable from "./Models/SubStyleTable.js";
import MaterialTable from "./Models/MaterialTable.js";
import StyleTable from "./Models/StyleTable.js";
import materialRouter from "./Routes/MaterialRoute.js";
import subStyleRouter from "./Routes/SubStyleRoute.js";
import styleRouter from "./Routes/StyleRoute.js";
import s3Router from "./Routes/S3Route.js";


dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.SERVER_PORT || 3004;

sequelize.sync({ alter: true })
  .then(() => {
    console.log("Tables synced successfully.");
    // After syncing, start your server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error syncing tables:", error);
  });




app.use("/materials", materialRouter);
app.use("/substyles", subStyleRouter);
app.use("/styles", styleRouter);
app.use("/", s3Router);

// Start server
