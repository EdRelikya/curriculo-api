import "dotenv/config";
import express from "express";
import helmet from "helmet";
import { sequelize } from "./models/index.js";
import {
  corsMiddleware,
  logMiddleware,
  limiterMiddleware,
  errorMiddleware,
} from "./middlewares/index.js";
import * as routes from "./routes/index.js";

const app = express();

app.set("trust proxy", true);

// middlewares
app.use(helmet());
app.use(corsMiddleware);
app.use(limiterMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logMiddleware);

// rotas
app.get("/", (req, res) => {
  return res.send("API de currículo executando...");
});
app.use("/people", routes.person);
app.use("/educations", routes.education);
app.use("/experiences", routes.experience);
app.use("/projects", routes.project);

// middleware global de erro (obrigatoriamente após todas as rotas)
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const eraseDatabaseOnSync = process.env.ERASE_DATABASE_ON_SYNC === "true";
const syncDatabase =
  process.env.SYNC_DATABASE === "true" || eraseDatabaseOnSync;

const startServer = () => {
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};

if (syncDatabase) {
  sequelize.sync({ force: eraseDatabaseOnSync }).then(startServer);
} else {
  startServer();
}

export default app;