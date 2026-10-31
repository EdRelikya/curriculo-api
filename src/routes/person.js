import { Router } from "express";
import {
  personController,
  educationController,
  experienceController,
  projectController,
} from "../controllers/index.js";

const router = Router();

// CRUD da pessoa
router.get("/", personController.getPeople);
router.post("/", personController.createPerson);
router.get("/:personId", personController.getPerson);
router.put("/:personId", personController.updatePerson);
router.delete("/:personId", personController.deletePerson);

// Relacionamentos: itens do currículo de uma pessoa
router.get("/:personId/educations", educationController.getEducationsByPerson);
router.post("/:personId/educations", educationController.createEducation);

router.get(
  "/:personId/experiences",
  experienceController.getExperiencesByPerson,
);
router.post("/:personId/experiences", experienceController.createExperience);

router.get("/:personId/projects", projectController.getProjectsByPerson);
router.post("/:personId/projects", projectController.createProject);

export default router;