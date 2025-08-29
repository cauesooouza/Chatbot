import { config } from "./config/config.js";
import { AppDataSource } from "./data/data-source.js";
import app from "./server.js";

AppDataSource.initialize().then(() => {
    app.listen(config.apiPort, () => {
        console.info(`server is running at ${config.apiPort} port`);
    });
}).catch((error) => {
    console.error(error);
    process.exit(1);
});
