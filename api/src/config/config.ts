interface Config {
    apiPort: number,
    apiSecret: string,
    apiPermission: string
    db: {
        port: number,
        username: string,
        password: string,
        name: string
    }
    development: boolean
}

export const config: Config = {
    apiPort: Number(process.env.API_PORT) || 5432,
    apiSecret: String(process.env.API_SECRET),
    apiPermission: String(process.env.API_PERMISSION),
    db: {
        port: Number(process.env.DATABASE_PORT) || 3000,
        username: String(process.env.DATABASE_USERNAME),
        password: String(process.env.DATABASE_PASSWORD),
        name: String(process.env.DATABASE_NAME)
    },
    development: process.env.NODE_ENV === "development",
}