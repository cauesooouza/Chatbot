import express, { Application } from 'express'
import leadRoutes from './routes/lead.routes.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import { errorHandler } from './middleware/errors/errorHandler.js';

const app: Application = express();
app.use('/lead', leadRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use(errorHandler);

export default app;