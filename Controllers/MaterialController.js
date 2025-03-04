import MaterialTable from "../Models/MaterialTable.js";
import sequelize from "../config/sequelizeConfig.js";
import { generatePresignedPutUrl } from "../utils/s3Utils.js";

// Controller to handle fetching all materials
export const getAllMaterials = async (req, res) => {
  try {
    // Fetch all materials from the MaterialTable
    const materials = await MaterialTable.findAll();

    // Check if there are materials
    if (!materials || materials.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No materials found",
      });
    }

    // Return the data as JSON
    return res.json({
      success: true,
      data: materials,
    });
  } catch (error) {
    console.error("Error fetching materials:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch materials",
      error: error.message, // Show the actual error message
    });
  }
};

// // Controller to handle creating a new material

// // Controller to handle creating a new material (without file URLs)
// export const createMaterial = async (req, res) => {
//   try {
//     const { name, description, manufacturer, materialType, compatability } = req.body;

//     // Create the material entry in the database (without file URLs)
//     const newMaterial = await MaterialTable.create({
//       name,
//       description,
//       manufacturer,
//       materialType,
//       compatability,
//       materialFile: null,  // File URLs will be added later
//       heroImage: null,
//       sampleImage: null,
//     });

//     res.status(201).json(newMaterial); // Return the created material
//   } catch (error) {
//     console.error("Error creating material:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

 

export const createMaterial = async (req, res) => {
  try {
    const { name, description, manufacturer, materialType, compatability } = req.body;
    console.log(name)
    // Generate presigned URLs for each file field
    const materialFileUrl = await generatePresignedPutUrl("materialFile", "image/png");
    const heroImageUrl = await generatePresignedPutUrl("heroImage", "image/jpeg");
    const sampleImageUrl = await generatePresignedPutUrl("sampleImage", "image/jpeg");

    // Create the material entry in the database, including the generated URLs
    const newMaterial = await MaterialTable.create({
      name,
      description,
      manufacturer,
      materialType,
      compatability,
      materialFile: materialFileUrl.key,  // Save the presigned URL to the database
      heroImage: heroImageUrl.key,
      sampleImage: sampleImageUrl.key,
    });

    // await MaterialTable.create({newMaterial});
    // Send the response back with the created material data
    res.status(201).json({newMaterial, url : [materialFileUrl.presignedUrl, heroImageUrl.presignedUrl, sampleImageUrl.presignedUrl]});
  } catch (error) {
    console.error("Error creating material:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// export const createMaterial = async (req, res) => {
//   try {
//     const { 
//       name, 
//       description, 
//       manufacturer, 
//       materialType, 
//       compatability, // this is a string in the request
//       materialFile, 
//       heroImage, 
//       sampleImage 
//     } = req.body;

//     const parsedCompatability = typeof compatability === 'string' ? JSON.parse(compatability) : compatability;

//     const material = await MaterialTable.create({
//       name,
//       description,
//       manufacturer,
//       materialType,
//       compatability: parsedCompatability,
//       materialFile,
//       heroImage,
//       sampleImage,
//     });

//     res.status(201).json(material); 
//   } catch (error) {
//     console.error("Error creating material:", error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// Controller to handle fetching a material by ID
export const getMaterialById = async (req, res) => {
  try {
    const { id } = req.params;
    const material = await MaterialTable.findByPk(id);
    
    if (!material) {
      return res.status(404).json({ error: 'Material not found' });
    }

    res.json(material); // Return the material details
  } catch (error) {
    console.error("Error fetching material:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// // Controller to handle updating a material by ID
export const updateMaterial = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the URL params
    const { 
      name, 
      description, 
      manufacturer, 
      materialType, 
      compatability, 
      materialFile, 
      heroImage, 
      sampleImage 
    } = req.body;

    // Find the material by ID
    const material = await MaterialTable.findOne({
      where: { id } // Find by the ID
    });

    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }

    // Parse compatability if it's a string (to handle cases where it's passed as a stringified array)
    const parsedCompatability = typeof compatability === 'string' ? JSON.parse(compatability) : compatability;

    // Update the material's fields
    material.name = name || material.name;
    material.description = description || material.description;
    material.manufacturer = manufacturer || material.manufacturer;
    material.materialType = materialType || material.materialType;
    material.compatability = parsedCompatability || material.compatability;
    material.materialFile = materialFile || material.materialFile;
    material.heroImage = heroImage || material.heroImage;
    material.sampleImage = sampleImage || material.sampleImage;

    // Save the updated material
    await material.save();

    res.status(200).json(material); // Return the updated material
  } catch (error) {
    console.error("Error updating material:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Controller to update the material with the uploaded file URL
export const updateMaterialWithFileUrl = async (req, res) => {
  try {
    const { materialId, fileType, fileUrl } = req.body;

    if (!materialId || !fileType || !fileUrl) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    // Find the material by ID
    const material = await MaterialTable.findByPk(materialId);

    if (!material) {
      return res.status(404).json({ error: "Material not found" });
    }

    // Update the material with the file URL
    switch (fileType) {
      case "materialFile":
        material.materialFile = fileUrl;
        break;
      case "heroImage":
        material.heroImage = fileUrl;
        break;
      case "sampleImage":
        material.sampleImage = fileUrl;
        break;
      default:
        return res.status(400).json({ error: "Invalid file type" });
    }

    // Save the updated material
    await material.save();

    res.status(200).json(material); // Return the updated material
  } catch (error) {
    console.error("Error updating material:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Controller to handle deleting a material by ID
export const deleteMaterial = async (req, res) => {
  try {
    const { id } = req.params;

    const material = await MaterialTable.findOne({
      where: { id } // Find by the ID
    });

    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }

    await material.destroy(); // Soft delete (if using paranoid: true)

    res.status(200).json({ message: 'Material deleted successfully' });
  } catch (error) {
    console.error("Error deleting material:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
