import { Router } from "express";
import { experienceController } from "../controllers/index.js";

const router = Router();

router.get("/:experienceId", experienceController.getExperience);
router.put("/:experienceId", experienceController.updateExperience);
router.delete("/:experienceId", experienceController.deleteExperience);

export default router;