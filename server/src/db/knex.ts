import knex from "knex";
import config from "./config";

const enviroment = process.env.NODE_ENV || "development";

export default knex(config[enviroment]);
