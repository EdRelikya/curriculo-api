import models from "../models/index.js";

const getEducationsByPerson = async (personId) => {
  return await models.Education.findAll({
    where: { personId },
    order: [["startDate", "DESC"]],
  });
};

const getEducationById = async (id) => {
  return await models.Education.findByPk(id);
};

const createEducation = async (personId, data) => {
  return await models.Education.create({ ...data, personId });
};

const updateEducation = async (id, data) => {
  const education = await models.Education.findByPk(id);
  if (!education) {
    return null;
  }
  return await education.update(data);
};

const deleteEducation = async (id) => {
  return await models.Education.destroy({
    where: { id },
  });
};

export default {
  getEducationsByPerson,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
};