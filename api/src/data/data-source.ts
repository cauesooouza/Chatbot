import { DataSource } from "typeorm";
import { config } from "../config/config.js";
import { Lead } from "../modules/Lead/lead.entity.js";
import { User } from "../modules/User/user.entity.js";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.name,
    logging: config.development,
    synchronize: true,
    entities: [Lead, User],
})