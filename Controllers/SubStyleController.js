// import SubStyleTable from "../Models/SubStyleTable.js";
// import sequelize from "../config/sequelizeConfig.js";
// import {op} from "sequelize";

// // Controller to handle fetching all substyles
// export const getAllSubStyles = async (req, res) => {
//   try {
//     const substyles = await SubStyleTable.findAll();

//     if (!substyles || substyles.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No substyles found",
//       });
//     }
//     return res.json({
//       success: true,
//       data: substyles,
//     });
//   } catch (error) {
//     console.error("Error fetching substyles:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch substyles",
//       error: error.message, // Show the actual error message
//     });
//   }
// };

// // Controller to handle creating a new substyle
// export const createSubStyle = async (req, res) => {
//   try {
//     const { name, status } = req.body;
//     const {materialIds} = req.body.materialIds

//     // Parse compatability if it's a string (to handle cases where it is passed as a stringified array)
//     const parsedCompatability = typeof compatability === 'string' ? JSON.parse(compatability) : compatability;

//     // Create the substyle entry in the database
//     const substyle = await SubStyleTable.create({
//       name,
//       compatability: parsedCompatability, // Pass the parsed array
//       status,
//     });

//     res.status(201).json(substyle); // Return the newly created substyle
//   } catch (error) {
//     console.error("Error creating substyle:", error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// // Controller to handle fetching a substyle by ID
// export const getSubStyleById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const substyle = await SubStyleTable.findByPk(id);
    
//     if (!substyle) {
//       return res.status(404).json({ error: 'Substyle not found' });
//     }

//     res.json(substyle); // Return the substyle details
//   } catch (error) {
//     console.error("Error fetching substyle:", error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// // Controller to handle updating a substyle by ID
// export const updateSubStyle = async (req, res) => {
//   try {
//     const { id } = req.params; // Get the ID from the URL params
//     const { name, compatability, status } = req.body;

//     // Find the substyle by ID
//     const substyle = await SubStyleTable.findOne({
//       where: { id } // Find by the ID
//     });

//     if (!substyle) {
//       return res.status(404).json({ message: 'Substyle not found' });
//     }

//     // Parse compatability if it's a string (to handle cases where it's passed as a stringified array)
//     const parsedCompatability = typeof compatability === 'string' ? JSON.parse(compatability) : compatability;

//     // Update the substyle's fields
//     substyle.name = name || substyle.name;
//     substyle.compatability = parsedCompatability || substyle.compatability;
//     substyle.status = status || substyle.status;

//     // Save the updated substyle
//     await substyle.save();

//     res.status(200).json(substyle); // Return the updated substyle
//   } catch (error) {
//     console.error("Error updating substyle:", error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// // Controller to handle deleting a substyle by ID

// export const deleteSubStyle = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const substyle = await SubStyleTable.findOne({
//       where: { id } // Find by the ID
//     });

//     if (!substyle) {
//       return res.status(404).json({ message: 'Substyle not found' });
//     }

//     await substyle.destroy(); // Soft delete (if using paranoid: true)
//     res.status(200).json({ message: 'Substyle deleted successfully' });
    
//   } catch (error) {
//     console.error("Error deleting substyle:", error);
    
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

import { Op } from "sequelize";  // Import Op for using `Op.in`
import SubStyleTable from "../Models/SubStyleTable.js";  // Import SubStyle model
import MaterialTable from "../Models/MaterialTable.js";  // Import Material model
import sequelize from "../config/sequelizeConfig.js";

// Controller to handle fetching all substyles with associated materials
export const getAllSubStyles = async (req, res) => {
  try {
    const substyles = await SubStyleTable.findAll({
      include: MaterialTable,  // Include the associated materials in the response
    });

    if (!substyles || substyles.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No substyles found",
      });
    }

    return res.json({
      success: true,
      data: substyles,
    });
  } catch (error) {
    console.error("Error fetching substyles:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch substyles",
      error: error.message,
    });
  }
};

// Controller to handle creating a new substyle and associating materials
export const createSubStyle = async (req, res) => {
  try {
    const { name, status, materialIds } = req.body;

    // Check if materialIds is provided and is an array
    if (!Array.isArray(materialIds) || materialIds.length === 0) {
      return res.status(400).json({ error: "Please provide an array of material IDs." });
    }

    // Check if all provided material IDs exist in the MaterialTable
    const materials = await MaterialTable.findAll({
      where: {
        id: {
          [Op.in]: materialIds,  // Use Op.in to find materials by IDs
        },
      },
    });

    if (materials.length !== materialIds.length) {
      return res.status(404).json({ error: "Some material IDs are not valid." });
    }

    // Create the substyle entry in the database
    const substyle = await SubStyleTable.create({
      name,
      status,
    });

    await substyle.addMaterials(materials);

    res.status(201).json(substyle); // Return the newly created substyle with associated materials
  } catch (error) {
    console.error("Error creating substyle:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to handle fetching a substyle by ID with associated materials
export const getSubStyleById = async (req, res) => {
  try {
    const { id } = req.params;
    const substyle = await SubStyleTable.findByPk(id, {
      include: MaterialTable,  // Include the associated materials
    });
    
    if (!substyle) {
      return res.status(404).json({ error: 'Substyle not found' });
    }

    res.json(substyle); // Return the substyle with its materials
  } catch (error) {
    console.error("Error fetching substyle:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to handle updating a substyle by ID and associating new materials
export const updateSubStyle = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the URL params
    const { name, status, materialIds } = req.body;

    // Find the substyle by ID
    const substyle = await SubStyleTable.findOne({
      where: { id }, // Find by the ID
    });

    if (!substyle) {
      return res.status(404).json({ message: 'Substyle not found' });
    }

    // Check if materialIds is provided and is an array
    if (materialIds && Array.isArray(materialIds) && materialIds.length > 0) {
      // Check if all provided material IDs exist in the MaterialTable
      const materials = await MaterialTable.findAll({
        where: {
          id: {
            [Op.in]: materialIds,  // Use Op.in to find materials by IDs
          },
        },
      });

      if (materials.length !== materialIds.length) {
        return res.status(404).json({ error: "Some material IDs are not valid." });
      }

      // Update the materials relationship (remove existing ones and add new ones)
      await substyle.setMaterials(materials); // Assumes 'setMaterials' is auto-generated by Sequelize
    }

    // Update the substyle's fields
    substyle.name = name || substyle.name;
    substyle.status = status || substyle.status;

    // Save the updated substyle
    await substyle.save();

    res.status(200).json(substyle); // Return the updated substyle
  } catch (error) {
    console.error("Error updating substyle:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to handle deleting a substyle by ID
// export const deleteSubStyle = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const substyle = await SubStyleTable.findOne({
//       where: { id } // Find by the ID
//     });

//     if (!substyle) {
//       return res.status(404).json({ message: 'Substyle not found' });
//     }

//     await substyle.destroy(); // Soft delete (if using paranoid: true)
//     res.status(200).json({ message: 'Substyle deleted successfully' });
    
//   } catch (error) {
//     console.error("Error deleting substyle:", error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

export const deleteSubStyle = async (req, res) => {
  try {
    const { id } = req.params;

    
    const substyle = await SubStyleTable.findOne({
      where: { id },
    });

    if (!substyle) {
      return res.status(404).json({ message: 'Substyle not found' });
    }

    // Manually delete the corresponding rows in MaterialSubStyle
    await sequelize.models.MaterialSubStyle.destroy({
      where: {
        SubStyleId: id,  // Delete all rows with this SubStyleId
      },
    });

    // Perform soft delete on SubStyle
    await substyle.destroy(); // This triggers cascading deletes in the join table

    // Respond to the client
    res.status(200).json({ message: 'Substyle and its associations deleted successfully' });
  } catch (error) {
    console.error("Error deleting substyle:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

