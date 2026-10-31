import Sequelize from "sequelize";
import pg from "pg";

import getPersonModel from "./person.js";
import getEducationModel from "./education.js";
import getExperienceModel from "./experience.js";
import getProjectModel from "./project.js";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectModule: pg,
});

const models = {
  Person: getPersonModel(sequelize, Sequelize),
  Education: getEducationModel(sequelize, Sequelize),
  Experience: getExperienceModel(sequelize, Sequelize),
  Project: getProjectModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;