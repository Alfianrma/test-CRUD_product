import { Sequelize } from "sequelize";

const dbconnect = new Sequelize("testdb", "root", "root", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

export default dbconnect;
