import express, { Application, json } from 'express'
import { AppDataSource } from './data/data-source.js';
import leadRoutes from './routes/lead.routes.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import { errorHandler } from './middleware/errors/errorHandler.js';

const app: Application = express();
app.use(json({ limit: '500b' }));
app.use('/lead', leadRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use(errorHandler);

AppDataSource.initialize().then(() => {
    app.listen(3000, () => {
        console.info(`server is running at 3000 port`)
    });
})