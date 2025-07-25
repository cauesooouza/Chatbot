interface Config {
    apiPort: number,
    apiSecret: string,
    db: {
        port: number,
        username: string,
        password: string,
        name: string
    }
    appPassword: string
    development: boolean
}

export const config: Config = {
    apiPort: Number(process.env.API_PORT) || 5432,
    apiSecret: String(process.env.APISECRET),
    db: {
        port: Number(process.env.DATABASE_PORT) || 3000,
        username: String(process.env.DATABASE_USERNAME),
        password: String(process.env.DATABASE_PASSWORD),
        name: String(process.env.DATABASE_NAME)
    },
    appPassword: String(process.env.APP_PASSWORD),
    development: process.env.NODE_ENV === "development",
}