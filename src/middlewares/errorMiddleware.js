const errorMiddleware = (err, req, res, next) => {
  // O stack só é enviado em desenvolvimento
  const withStack =
    process.env.NODE_ENV === "development" ? { stack: err.stack } : {};

  // Validação do Sequelize (campo obrigatório vazio, e-mail inválido etc.)
  if (err.name === "SequelizeValidationError") {
    return res.status(400).send({
      status: "fail",
      message: err.errors.map((e) => e.message).join(", "),
      ...withStack,
    });
  }

  // Valor único duplicado (ex.: e-mail já cadastrado)
  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).send({
      status: "fail",
      message: `Já existe um registro com esse valor: ${err.errors
        .map((e) => e.path)
        .join(", ")}`,
      ...withStack,
    });
  }

  // Id em formato inválido (ex.: UUID mal formado)
  if (err.name === "SequelizeDatabaseError" && err.parent?.code === "22P02") {
    return res.status(400).send({
      status: "fail",
      message: "Valor inválido enviado na requisição.",
      ...withStack,
    });
  }

  // JSON mal formado no corpo da requisição
  if (err.type === "entity.parse.failed") {
    return res.status(400).send({
      status: "fail",
      message: "JSON inválido no corpo da requisição.",
      ...withStack,
    });
  }

  // Erros previstos (lançados com "throw new AppError(...)")
  if (err.isOperational) {
    return res.status(err.statusCode).send({
      status: err.status,
      message: err.message,
      ...withStack,
    });
  }

  // Erro inesperado: nunca vaza detalhes internos para o cliente
  console.error("ERRO INESPERADO:", err);
  return res.status(500).send({
    status: "error",
    message: "Algo deu errado no servidor",
    ...withStack,
  });
};

export default errorMiddleware;