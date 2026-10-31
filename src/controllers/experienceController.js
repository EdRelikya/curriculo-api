import { experienceService, personService } from "../services/index.js";
import AppError from "../utils/appError.js";
import pick from "../utils/pick.js";

const EXPERIENCE_FIELDS = [
  "company",
  "role",
  "startDate",
  "endDate",
  "description",
];

const assertPersonExists = async (personId) => {
  const exists = await personService.personExists(personId);
  if (!exists) {
    throw new AppError("Pessoa não encontrada.", 404);
  }
};

const getExperiencesByPerson = async (req, res) => {
  await assertPersonExists(req.params.personId);
  const experiences = await experienceService.getExperiencesByPerson(
    req.params.personId,
  );
  return res.status(200).send(experiences);
};

const getExperience = async (req, res) => {
  const experience = await experienceService.getExperienceById(
    req.params.experienceId,
  );

  if (!experience) {
    throw new AppError("Experiência não encontrada.", 404);
  }

  return res.status(200).send(experience);
};

const createExperience = async (req, res) => {
  await assertPersonExists(req.params.personId);
  const experience = await experienceService.createExperience(
    req.params.personId,
    pick(req.body, EXPERIENCE_FIELDS),
  );
  return res.status(201).send(experience);
};

const updateExperience = async (req, res) => {
  const experience = await experienceService.updateExperience(
    req.params.experienceId,
    pick(req.body, EXPERIENCE_FIELDS),
  );

  if (!experience) {
    throw new AppError("Experiência não encontrada.", 404);
  }

  return res.status(200).send(experience);
};

const deleteExperience = async (req, res) => {
  const deleted = await experienceService.deleteExperience(
    req.params.experienceId,
  );

  if (!deleted) {
    throw new AppError("Experiência não encontrada.", 404);
  }

  return res.status(204).send();
};

export default {
  getExperiencesByPerson,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
};