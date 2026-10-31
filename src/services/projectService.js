import models from "../models/index.js";

const getProjectsByPerson = async (personId) => {
  return await models.Project.findAll({
    where: { personId },
    order: [["name", "ASC"]],
  });
};

const getProjectById = async (id) => {
  return await models.Project.findByPk(id);
};

const createProject = async (personId, data) => {
  return await models.Project.create({ ...data, personId });
};

const updateProject = async (id, data) => {
  const project = await models.Project.findByPk(id);
  if (!project) {
    return null;
  }
  return await project.update(data);
};

const deleteProject = async (id) => {
  return await models.Project.destroy({
    where: { id },
  });
};

export default {
  getProjectsByPerson,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};