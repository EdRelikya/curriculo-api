import { educationService, personService } from "../services/index.js";
import AppError from "../utils/appError.js";
import pick from "../utils/pick.js";

const EDUCATION_FIELDS = [
  "institution",
  "degree",
  "fieldOfStudy",
  "startDate",
  "endDate",
];

const assertPersonExists = async (personId) => {
  const exists = await personService.personExists(personId);
  if (!exists) {
    throw new AppError("Pessoa não encontrada.", 404);
  }
};

const getEducationsByPerson = async (req, res) => {
  await assertPersonExists(req.params.personId);
  const educations = await educationService.getEducationsByPerson(
    req.params.personId,
  );
  return res.status(200).send(educations);
};

const getEducation = async (req, res) => {
  const education = await educationService.getEducationById(
    req.params.educationId,
  );

  if (!education) {
    throw new AppError("Formação não encontrada.", 404);
  }

  return res.status(200).send(education);
};

const createEducation = async (req, res) => {
  await assertPersonExists(req.params.personId);
  const education = await educationService.createEducation(
    req.params.personId,
    pick(req.body, EDUCATION_FIELDS),
  );
  return res.status(201).send(education);
};

const updateEducation = async (req, res) => {
  const education = await educationService.updateEducation(
    req.params.educationId,
    pick(req.body, EDUCATION_FIELDS),
  );

  if (!education) {
    throw new AppError("Formação não encontrada.", 404);
  }

  return res.status(200).send(education);
};

const deleteEducation = async (req, res) => {
  const deleted = await educationService.deleteEducation(
    req.params.educationId,
  );

  if (!deleted) {
    throw new AppError("Formação não encontrada.", 404);
  }

  return res.status(204).send();
};

export default {
  getEducationsByPerson,
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
};