import { projectService, personService } from "../services/index.js";
import AppError from "../utils/appError.js";
import pick from "../utils/pick.js";

const PROJECT_FIELDS = ["name", "description", "repositoryUrl"];

const assertPersonExists = async (personId) => {
  const exists = await personService.personExists(personId);
  if (!exists) {
    throw new AppError("Pessoa não encontrada.", 404);
  }
};

const getProjectsByPerson = async (req, res) => {
  await assertPersonExists(req.params.personId);
  const projects = await projectService.getProjectsByPerson(
    req.params.personId,
  );
  return res.status(200).send(projects);
};

const getProject = async (req, res) => {
  const project = await projectService.getProjectById(req.params.projectId);

  if (!project) {
    throw new AppError("Projeto não encontrado.", 404);
  }

  return res.status(200).send(project);
};

const createProject = async (req, res) => {
  await assertPersonExists(req.params.personId);
  const project = await projectService.createProject(
    req.params.personId,
    pick(req.body, PROJECT_FIELDS),
  );
  return res.status(201).send(project);
};

const updateProject = async (req, res) => {
  const project = await projectService.updateProject(
    req.params.projectId,
    pick(req.body, PROJECT_FIELDS),
  );

  if (!project) {
    throw new AppError("Projeto não encontrado.", 404);
  }

  return res.status(200).send(project);
};

const deleteProject = async (req, res) => {
  const deleted = await projectService.deleteProject(req.params.projectId);

  if (!deleted) {
    throw new AppError("Projeto não encontrado.", 404);
  }

  return res.status(204).send();
};

export default {
  getProjectsByPerson,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};