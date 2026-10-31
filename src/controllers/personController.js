import { personService } from "../services/index.js";
import AppError from "../utils/appError.js";
import pick from "../utils/pick.js";

const PERSON_FIELDS = ["fullName", "email", "phone", "city", "summary"];

const getPeople = async (req, res) => {
  const people = await personService.getAllPeople();
  // 200 OK: listagem
  return res.status(200).send(people);
};

const getPerson = async (req, res) => {
  const person = await personService.getPersonById(req.params.personId);

  if (!person) {
    throw new AppError("Pessoa não encontrada.", 404);
  }

  // 200 OK: currículo completo (pessoa + formações + experiências + projetos)
  return res.status(200).send(person);
};

const createPerson = async (req, res) => {
  const person = await personService.createPerson(
    pick(req.body, PERSON_FIELDS),
  );

  // 201 Created: recurso criado
  return res.status(201).send(person);
};

const updatePerson = async (req, res) => {
  const person = await personService.updatePerson(
    req.params.personId,
    pick(req.body, PERSON_FIELDS),
  );

  if (!person) {
    throw new AppError("Pessoa não encontrada.", 404);
  }

  // 200 OK: devolve o objeto atualizado
  return res.status(200).send(person);
};

const deletePerson = async (req, res) => {
  const deleted = await personService.deletePerson(req.params.personId);

  if (!deleted) {
    throw new AppError("Pessoa não encontrada.", 404);
  }

  // 204 No Content: apagado, sem corpo na resposta
  return res.status(204).send();
};

export default {
  getPeople,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson,
};