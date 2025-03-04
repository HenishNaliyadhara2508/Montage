import express from "express";
import {
    getAllStyles,
    createStyle,
    getStyleById,
    updateStyle,
    deleteStyle,
} from "../Controllers/StyleController.js";

const styleRouter = express.Router();

styleRouter.get("/", getAllStyles);

styleRouter.post("/", createStyle);

styleRouter.get("/:id", getStyleById);

styleRouter.put("/:id", updateStyle);

styleRouter.delete("/:id", deleteStyle);

export default styleRouter;