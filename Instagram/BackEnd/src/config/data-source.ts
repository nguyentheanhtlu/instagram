import "reflect-metadata";
import { DataSource, FileLogger } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "theanh", 
  synchronize: false,
  logging: false,
  entities: ["dist/src/model/*.js"],
  migrations: ["dist/src/migrations/*.js"],
});