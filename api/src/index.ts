import app from "./app.js";
import { config } from "./config/config.js";
import { AppDataSource } from "./data/data-source.js";

AppDataSource.initialize().then(() => {
    app.listen(config.apiPort, () => {
        console.info(`server is running at ${config.apiPort} port`)
    });
})