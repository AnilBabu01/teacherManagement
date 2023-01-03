import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user";
import { Teaching } from "../models/teaching";
import { Research } from "../models/research";
import { Qualification } from "../models/qualification";
import { Marks } from "../models/marks";
import { Administration } from "../models/administration";
export const sequelize = new Sequelize("dbuu", "root", "", {
  host: "localhost",
  dialect: "mysql",
  models: [User, Teaching, Research, Qualification, Marks, Administration],
});
