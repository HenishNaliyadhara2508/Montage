// import { DataTypes } from "sequelize";
// import sequelize from "../config/sequelizeConfig.js";
// import MaterialTable from "./MaterialTable.js";  // Import MaterialTable for association

// export default function SubStyleTable(sequelize) {
//   const SubStyleTable = sequelize.define(
//     "SubStyle",
//     {
//       id: {
//         type: DataTypes.UUID,  // UUID type for the primary key
//         defaultValue: DataTypes.UUIDV4,  // Auto-generate UUIDv4
//         primaryKey: true,
//       },
//       name: {
//         type: DataTypes.STRING,  // Name of the sub-style
//         allowNull: false,  // Cannot be null
//       },
//       status: {
//         type: DataTypes.ENUM('UNPUBLISH', 'DRAFT', 'PUBLISH'),  // Enum for status
//         defaultValue: 'UNPUBLISH',  // Default value
//       },
//     },
//     {
//       freezeTableName: true,  // Prevent sequelize from pluralizing the table name
//       paranoid: true,  // Soft deletes (with a deletedAt column)
//       deletedAt: "deletedAt",  // Custom name for the deletedAt column
//     }
//   );

//   // Associations
//   SubStyleTable.belongsToMany(MaterialTable(sequelize), {
//     through: "MaterialSubStyle",
//   });
//   MaterialTable(sequelize).belongsToMany(SubStyleTable, {
//     through: "MaterialSubStyle",
//   });

//   // Sync the model automatically
//   SubStyleTable.sync({ force: false })  // Sync without dropping data
//     .then(() => {
//       console.log("SubStyle table synced successfully.");
//     })
//     .catch((error) => {
//       console.error("Error syncing SubStyle table:", error);
//     });

//   return SubStyleTable;  // Returning the model for use in other parts of the application
// }


// SubStyleTable.js
// import { DataTypes } from "sequelize";
// import sequelize from "../config/sequelizeConfig.js";
// import MaterialTable from "./MaterialTable.js"; // Import MaterialTable
// import MaterialSubStyle from "./MaterialSubStyleTable.js"; // Import MaterialSubStyle

// export default function SubStyleTable(sequelize) {
//   const SubStyleTable = sequelize.define(
//     "SubStyle",
//     {
//       id: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         primaryKey: true,
//       },
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       compatability: {
//         type: DataTypes.ARRAY(DataTypes.STRING),
//       },
//       status: {
//         type: DataTypes.ENUM("UNPUBLISH", "DRAFT", "PUBLISH"),
//         defaultValue: "UNPUBLISH",
//       },
//     },
//     {
//       freezeTableName: true,
//       paranoid: true,
//       deletedAt: "deletedAt", // Enable soft deletes
//     }
//   );

//   // Now define the many-to-many relationship after both models are defined
//   SubStyleTable.belongsToMany(MaterialTable(sequelize), {
//     through: MaterialSubStyle(sequelize),
//     foreignKey: "subStyleId", // Foreign key on MaterialSubStyle
//     otherKey: "materialId", // Other foreign key on MaterialSubStyle
//   });

//   return SubStyleTable;
// }

// export default SubStyleTable;

// models/SubStyleTable.js
// import { DataTypes } from "sequelize";
// import sequelize from "../config/sequelizeConfig.js";
// import MaterialTable from "./MaterialTable.js"; // Import MaterialTable for association

// const SubStyleTable = sequelize.define(
//   "SubStyle",
//   {
//     id: {
//       type: DataTypes.UUID,  // UUID type for the primary key
//       defaultValue: DataTypes.UUIDV4,  // Auto-generate UUIDv4
//       primaryKey: true,
//     },
//     name: {
//       type: DataTypes.STRING,  // Name of the sub-style
//       allowNull: false,  // Cannot be null
//     },
//     status: {
//       type: DataTypes.ENUM('UNPUBLISH', 'DRAFT', 'PUBLISH'),  // Enum for status
//       defaultValue: 'UNPUBLISH',  // Default value
//     },
//   },
//   {
//     freezeTableName: true,  // Prevent sequelize from pluralizing the table name
//     paranoid: true,  // Soft deletes (with a deletedAt column)
//     deletedAt: "deletedAt",  // Custom name for the deletedAt column
//   }
// );

// // Associations
// SubStyleTable.belongsToMany(MaterialTable, {
//   through: "MaterialSubStyle1",
//   onDelete: "CASCADE",  // Many-to-many relation through the join table
// });

// MaterialTable.belongsToMany(SubStyleTable, {
//   through: "MaterialSubStyle1",
//   onDelete: "CASCADE",  // Many-to-many relation through the join table
// });

// // Sync the model automatically
// SubStyleTable.sync({ alter: true })  // Sync without dropping data
//   .then(() => {
//     console.log("SubStyle table synced successfully.");
//   })
//   .catch((error) => {
//     console.error("Error syncing SubStyle table:", error);
//   });

// // Export the model directly
// export default SubStyleTable;

import { DataTypes } from "sequelize";
import sequelize from "../config/sequelizeConfig.js";
import MaterialTable from "./MaterialTable.js";  // Import MaterialTable

const SubStyleTable = sequelize.define(
  "SubStyle",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("UNPUBLISH", "DRAFT", "PUBLISH"),
      defaultValue: "UNPUBLISH",
    },
  },
  {
    freezeTableName: true,
    paranoid: true,
    deletedAt: "deletedAt",  // Soft delete support
  }
);

// Many-to-Many relationship setup between SubStyle and Material
SubStyleTable.belongsToMany(MaterialTable, {
  through: "MaterialSubStyle", // Join table name
  onDelete: "CASCADE",         // Ensuring deletion in join table on deletion
});

MaterialTable.belongsToMany(SubStyleTable, {
  through: "MaterialSubStyle",  // Join table name
  onDelete: "CASCADE",          // Ensuring deletion in join table on deletion
});





sequelize.sync({ alter: true })  // This will alter the tables wi
  .then(() => {
    console.log("Database synced successfully.");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

export default SubStyleTable;

