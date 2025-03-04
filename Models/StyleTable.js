// import { DataTypes } from "sequelize";
// import sequelize from "../config/sequelizeConfig.js";

// export default function StyleTable(sequelize) {
//   const StyleTable = sequelize.define(
//     "Style",
//     {
//       id: {
//         type: DataTypes.UUID, // UUID type for the id
//         defaultValue: DataTypes.UUIDV4, // Default to UUIDv4 for new records
//         primaryKey: true, // Set as the primary key
//       },
//       name: {
//         type: DataTypes.STRING, // String type for name
//         allowNull: false, // Make name required
//         unique: true,
//       },
//       compatability: {
//         type: DataTypes.ARRAY(DataTypes.STRING),
//       },
//       substyleData: {
//         type: DataTypes.ARRAY(DataTypes.JSON), 
//       },
//       status: {
//         type: DataTypes.ENUM(
//           "UNPUBLISH",
//           "DRAFT",
//           "PUBLISH" 
//         ),
//         defaultValue: "UNPUBLISH", 
//       },
//     },
//     {
//       freezeTableName: true,
//       paranoid: true,
//       deletedAt: "deletedAt",
//     }
//   );

//   StyleTable.sync({ force: false })
//   .then(() => {
//     console.log("Style table synced successfully.");
//   })
//   .catch((error) => {
//     console.error("Error syncing Style table:", error);
//   });

//   return StyleTable;
// }

// models/StyleTable.js
import { DataTypes } from "sequelize";
import sequelize from "../config/sequelizeConfig.js";

const StyleTable = sequelize.define(
  "Style",
  {
    id: {
      type: DataTypes.UUID,  // UUID type for the id
      defaultValue: DataTypes.UUIDV4,  // Default to UUIDv4 for new records
      primaryKey: true,  // Set as the primary key
    },
    name: {
      type: DataTypes.STRING,  // String type for name
      allowNull: false,  // Make name required
      unique: true,  // Ensure the name is unique
    },
    compatability: {
      type: DataTypes.ARRAY(DataTypes.STRING),  // Array of strings for compatibility
    },
    substyleData: {
      type: DataTypes.ARRAY(DataTypes.JSON),  // Array of JSON objects for substyle data
    },
    status: {
      type: DataTypes.ENUM("UNPUBLISH", "DRAFT", "PUBLISH"),  // Enum for status
      defaultValue: "UNPUBLISH",  // Default to "UNPUBLISH"
    },
  },
  {
    freezeTableName: true,  // Prevent sequelize from pluralizing the table name
    paranoid: true,  // Enable soft deletes (with a deletedAt column)
    deletedAt: "deletedAt",  // Custom name for the deletedAt column
  }
);

// Sync the model automatically
StyleTable.sync({ alter: true })  // Sync without dropping data
  .then(() => {
    console.log("Style table synced successfully.");
  })
  .catch((error) => {
    console.error("Error syncing Style table:", error);
  });

// Export the model directly
export default StyleTable;
