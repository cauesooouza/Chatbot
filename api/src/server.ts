import express, { Application } from 'express'
import { errorHandler } from './middleware/errors/errorHandler.js';
import leadRoutes from './routes/lead.routes.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';

const app: Application = express();
app.use(express.json());
app.use('/lead', leadRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use(errorHandler);

export default app;