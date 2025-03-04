// import { DataTypes } from "sequelize";
// import sequelize from "../config/sequelizeConfig.js";
// import MaterialTable from "./MaterialTable.js";
// import SubStyleTable from "./SubStyleTable.js";

// const MaterialSubStyle = sequelize.define(
//   "MaterialSubStyle",
//   {
//     // Optionally add additional fields to the join table
//     createdAt: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW, // Optional custom field
//     },
//     updatedAt: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW, // Optional custom field
//     },
//   },
//   {
//     freezeTableName: true,
//     paranoid: true, // Soft deletes
//   }
// );

// // Now define the relationships explicitly
// MaterialTable.belongsToMany(SubStyleTable, {
//   through: MaterialSubStyle,
//   onDelete: "CASCADE",
// });
// SubStyleTable.belongsToMany(MaterialTable, {
//   through: MaterialSubStyle,
//   onDelete: "CASCADE",
// });

// export default MaterialSubStyle;

// // MaterialSubStyleTable.js
// // import { DataTypes } from "sequelize";
// // import sequelize from "../config/sequelizeConfig.js";
// // import MaterialTable from "./MaterialTable.js"; // Import MaterialTable
// // import SubStyleTable from "./SubStyleTable.js"; // Import SubStyleTable

// // export default function MaterialSubStyle(sequelize) {
// //   const MaterialSubStyle = sequelize.define(
// //     "MaterialSubStyle",
// //     {
// //       materialId: {
// //         type: DataTypes.UUID,
// //         references: {
// //           model: MaterialTable(sequelize), // Reference to MaterialTable
// //           key: "id", // Foreign key to MaterialTable
// //         },
// //         allowNull: false,
// //       },
// //       subStyleId: {
// //         type: DataTypes.UUID,
// //         references: {
// //           model: SubStyleTable(sequelize), // Reference to SubStyleTable
// //           key: "id", // Foreign key to SubStyleTable
// //         },
// //         allowNull: false,
// //       },
// //     },
// //     {
// //       freezeTableName: true, // Ensure the table name stays the same
// //       paranoid: true, // Enable soft deletes
// //     }
// //   );

// //   return MaterialSubStyle;
// // }
