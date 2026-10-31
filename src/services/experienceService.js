import models from "../models/index.js";

const getExperiencesByPerson = async (personId) => {
  return await models.Experience.findAll({
    where: { personId },
    order: [["startDate", "DESC"]],
  });
};

const getExperienceById = async (id) => {
  return await models.Experience.findByPk(id);
};

const createExperience = async (personId, data) => {
  return await models.Experience.create({ ...data, personId });
};

const updateExperience = async (id, data) => {
  const experience = await models.Experience.findByPk(id);
  if (!experience) {
    return null;
  }
  return await experience.update(data);
};

const deleteExperience = async (id) => {
  return await models.Experience.destroy({
    where: { id },
  });
};

export default {
  getExperiencesByPerson,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
};