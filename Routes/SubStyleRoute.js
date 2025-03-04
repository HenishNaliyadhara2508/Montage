import express from "express";
import {
    getAllSubStyles,
    createSubStyle,
    getSubStyleById,
    updateSubStyle,
    deleteSubStyle,
  } from "../Controllers/SubStyleController.js";

const subStyleRouter = express.Router();

subStyleRouter.get("/", getAllSubStyles);

subStyleRouter.post("/", createSubStyle);

subStyleRouter.get("/:id", getSubStyleById);

subStyleRouter.put("/:id", updateSubStyle);

subStyleRouter.delete("/:id", deleteSubStyle);

export default subStyleRouter;
