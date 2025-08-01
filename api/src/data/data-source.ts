import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "../config/config.js";
import { Lead } from "../modules/Lead/lead.entity.js";
import { User } from "../modules/User/user.entity.js";

export const AppDataSource = new DataSource({
    type: config.db.type as any,
    host: config.db.host,
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.name,
    logging: config.logging,
    synchronize: config.synchronize,
    entities: [Lead, User],
})