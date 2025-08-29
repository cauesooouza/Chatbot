import { DataSource } from "typeorm";
import { config } from "../config/config.js";
import { Lead } from "../modules/Lead/lead.entity.js";
import { User } from "../modules/User/user.entity.js";
import { DataSourceOptions } from "typeorm/browser";

const prodConfig: DataSourceOptions = {
    type: config.db.type as any,
    host: config.db.host,
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.name,
    logging: false,
    synchronize: false,
    dropSchema: false,
    entities: [Lead, User],
}

const testConfig: DataSourceOptions = {
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [Lead, User],
}

let typeOfConfig: DataSourceOptions;

if (process.env.NODE_ENV === 'test') {
    typeOfConfig = testConfig;
} else {
    typeOfConfig = prodConfig;
}

export const AppDataSource = new DataSource(typeOfConfig);