import StyleTable from "../Models/StyleTable.js";
import sequelize from "../config/sequelizeConfig.js";
import { validate as isUUID } from 'uuid';

export const getAllStyles = async (req, res) => {
    try {
        const styles = await StyleTable.findAll();
        res.status(200).json(styles);
    } catch (error) {
        console.error("Error fetching styles:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



export const getStyleById = async (req, res) => {
    const { id } = req.params;
    if (!isUUID(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    try {
        const style = await StyleTable.findByPk(id);
        if (!style) {
            return res.status(404).json({ error: "Style not found" });
        }
        res.status(200).json(style);
    } catch (error) {
        console.error("Error fetching style:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const createStyle = async (req, res) => {
    try {
        const { name, compatability, status } = req.body;

        // Validate that required fields are provided
        if (!name || !compatability || !status) {
            return res.status(400).json({ error: "Name, compatability, and status are required" });
        }

        // Validate status (ensure it is one of the enum values)
        const validStatuses = ['UNPUBLISH', 'DRAFT', 'PUBLISH'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: "Invalid status value" });
        }

        // Check if a style with the same name already exists
        const existingStyle = await StyleTable.findOne({ where: { name } });
        if (existingStyle) {
            return res.status(400).json({ error: "Style with this name already exists" });
        }

        // Create the style with compatability and status
        const style = await StyleTable.create({
            name,
            compatability,  // Array of strings
            status,         // Enum value (UNPUBLISH, DRAFT, PUBLISH)
        });

        res.status(201).json(style);
    } catch (error) {
        console.error("Error creating style:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
 

export const updateStyle = async (req, res) => {
    const { id } = req.params;
    const { name, compatability, status } = req.body;

    try {
        const style = await StyleTable.findByPk(id);
        if (!style) {
            return res.status(404).json({ error: "Style not found" });
        }

        // If 'name' is being updated, check for duplicate names
        if (name && name !== style.name) {
            const existingStyle = await StyleTable.findOne({ where: { name } });
            if (existingStyle) {
                return res.status(400).json({ error: "Style with this name already exists" });
            }
            style.name = name;
        }

        // Update compatability and status fields if provided
        if (compatability) {
            style.compatability = compatability;  // Array of strings
        }

        if (status) {
            const validStatuses = ['UNPUBLISH', 'DRAFT', 'PUBLISH'];
            if (!validStatuses.includes(status)) {
                return res.status(400).json({ error: "Invalid status value" });
            }
            style.status = status;  // Enum value (UNPUBLISH, DRAFT, PUBLISH)
        }

        await style.save();
        res.status(200).json(style);
    } catch (error) {
        console.error("Error updating style:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



export const deleteStyle = async (req, res) => {
    try {
        const { id } = req.params;
        const style = await StyleTable.findByPk(id);
        if (!style) {
            return res.status(404).json({ error: "Style not found" });
        }
        await style.destroy();
        res.status(200).json({ message: "Style deleted successfully" });
    } catch (error) {
        console.error("Error deleting style:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
