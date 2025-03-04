// import { DataTypes } from "sequelize";
// import sequelize from "../config/sequelizeConfig.js";
// import MaterialSubStyle from "./MaterialSubStyleTable.js";
// import SubStyleTable from "./SubStyleTable.js";

// export default function MaterialTable(sequelize) {
//   const MaterialTable = sequelize.define(
//     "Material",
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
//       description: {
//         type: DataTypes.TEXT,
//       },
//       manufacturer: {
//         type: DataTypes.STRING,
//       },
//       materialType: {
//         type: DataTypes.STRING,
//       },
//       compatability: {
//         type: DataTypes.ARRAY(DataTypes.STRING),
//       },
//       materialFile: {
//         type: DataTypes.TEXT,
//       },
//       heroImage: {
//         type: DataTypes.TEXT,
//       },
//       sampleImage: {
//         type: DataTypes.TEXT,
//       },
//     },
//     {
//       freezeTableName: true,
//       paranoid: true,
//       deletedAt: "deletedAt",
//     }
//   );

//   MaterialTable.sync({ force: false })
//   .then(() => {
//     console.log("Material table synced successfully.");
//   })
//   .catch((error) => {
//     console.error("Error syncing Material table:", error);
//   });
//   // MaterialTable.belongsToMany(SubStyleTable(sequelize), {
//   //   through: MaterialSubStyle(sequelize),
//   //   foreignKey: "materialId", // Foreign key on MaterialSubStyle
//   //   otherKey: "subStyleId", // Other foreign key on MaterialSubStyle
//   // });
//   return MaterialTable;
// }

// MaterialTable.js
// import { DataTypes } from "sequelize";
// import sequelize from "../config/sequelizeConfig.js";
// import MaterialSubStyle from "./MaterialSubStyleTable.js"; // Import MaterialSubStyle
// import SubStyleTable from "./SubStyleTable.js"; // Import SubStyleTable

// export default function MaterialTable(sequelize) {
//   const MaterialTable = sequelize.define(
//     "Material",
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
//       description: {
//         type: DataTypes.TEXT,
//       },
//       manufacturer: {
//         type: DataTypes.STRING,
//       },
//       materialType: {
//         type: DataTypes.STRING,
//       },
//       compatability: {
//         type: DataTypes.ARRAY(DataTypes.STRING),
//       },
//       materialFile: {
//         type: DataTypes.TEXT,
//       },
//       heroImage: {
//         type: DataTypes.TEXT,
//       },
//       sampleImage: {
//         type: DataTypes.TEXT,
//       },
//     },
//     {
//       freezeTableName: true,
//       paranoid: true,
//       deletedAt: "deletedAt", // Enable soft deletes
//     }
//   );

 

//   return MaterialTable;
// }

// models/MaterialTable.js
import { DataTypes } from "sequelize";
import sequelize from "../config/sequelizeConfig.js";

const MaterialTable = sequelize.define(
  "Material",
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
    description: {
      type: DataTypes.TEXT,
    },
    manufacturer: {
      type: DataTypes.STRING,
    },
    materialType: {
      type: DataTypes.STRING,
    },
    compatability: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    materialFile: {
      type: DataTypes.TEXT,
    },
    heroImage: {
      type: DataTypes.TEXT,
    },
    sampleImage: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
    paranoid: true,
    deletedAt: "deletedAt",
  }
);

// Sync the model
MaterialTable.sync({ alter: true })
  .then(() => {
    console.log("Material table synced successfully.");
  })
  .catch((error) => {
    console.error("Error syncing Material table:", error);
  });

export default MaterialTable;

