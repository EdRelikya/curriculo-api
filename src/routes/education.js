import { Router } from "express";
import { educationController } from "../controllers/index.js";

const router = Router();

router.get("/:educationId", educationController.getEducation);
router.put("/:educationId", educationController.updateEducation);
router.delete("/:educationId", educationController.deleteEducation);

export default router;