import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user.model";
import { Teaching } from "../models/teaching.model";
import { Research } from "../models/research.model";
import { Qualification } from "../models/qualification.model";
import { Marks } from "../models/marks.model";
import { Administration } from "../models/administration.model";
export const sequelize = new Sequelize("dbuu", "root", "", {
  host: "localhost",
  dialect: "mysql",
  models: [User, Teaching, Research, Qualification, Marks, Administration],
});
