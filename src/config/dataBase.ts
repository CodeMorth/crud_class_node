const { Sequelize } = require("sequelize");

import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "./env.config";

export const dataBase = new Sequelize({
  host: DB_HOST,
  database: DB_DATABASE,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  dialect: "mysql",
});
