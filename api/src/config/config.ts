interface IConfig {
    apiPort: number,
    apiSecret: string,
    apiPermission: string
    db: {
        port: number,
        username: string,
        password: string,
        name: string,
        type: string,
        host: string
    }
    logging: boolean,
    synchronize: boolean
}

export const config: IConfig = {
    apiPort: Number(process.env.API_PORT),
    apiSecret: String(process.env.API_SECRET),
    apiPermission: String(process.env.API_PERMISSION),
    db: {
        type: String(process.env.DATABASE_TYPE),
        host: String(process.env.DATABASE_HOST),
        port: Number(process.env.DATABASE_PORT),
        username: String(process.env.DATABASE_USERNAME),
        password: String(process.env.DATABASE_PASSWORD),
        name: String(process.env.DATABASE_NAME),
    },
    logging: process.env.NODE_ENV === "development",
    synchronize: process.env.NODE_ENV === "development"
}