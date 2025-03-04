import express from "express";
import {
  getAllMaterials,
  createMaterial,
  getMaterialById,
  updateMaterial,
  deleteMaterial,
  updateMaterialWithFileUrl,
} from "../Controllers/MaterialController.js";

const materialRouter = express.Router();

materialRouter.get("/", getAllMaterials);

materialRouter.post("/", createMaterial);

materialRouter.get("/:id", getMaterialById);

materialRouter.put("/:id", updateMaterial);

materialRouter.put("/:id", updateMaterialWithFileUrl);

materialRouter.delete("/:id", deleteMaterial);

export default materialRouter;
