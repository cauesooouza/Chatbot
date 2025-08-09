import express, { Application } from 'express'
import { AppDataSource } from './data/data-source.js';
import leadRoutes from './routes/lead.routes.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import { errorHandler } from './middleware/errors/errorHandler.js';
import { config } from './config/config.js';

const app: Application = express();
app.use('/lead', leadRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use(errorHandler);

AppDataSource.initialize().then(() => {
    app.listen(config.apiPort, () => {
        console.info(`server is running at ${config.apiPort} port`)
    });
})