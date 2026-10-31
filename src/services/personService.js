import models from "../models/index.js";

const getAllPeople = async () => {
  return await models.Person.findAll({ order: [["fullName", "ASC"]] });
};

const getPersonById = async (id) => {
  return await models.Person.findByPk(id, {
    include: [
      { model: models.Education, as: "educations" },
      { model: models.Experience, as: "experiences" },
      { model: models.Project, as: "projects" },
    ],
  });
};

const personExists = async (id) => {
  const total = await models.Person.count({ where: { id } });
  return total > 0;
};

const createPerson = async (data) => {
  return await models.Person.create(data);
};

const updatePerson = async (id, data) => {
  const person = await models.Person.findByPk(id);
  if (!person) {
    return null;
  }
  return await person.update(data);
};

const deletePerson = async (id) => {
  return await models.Person.destroy({
    where: { id },
  });
};

export default {
  getAllPeople,
  getPersonById,
  personExists,
  createPerson,
  updatePerson,
  deletePerson,
};