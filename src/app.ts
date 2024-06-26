import express, { Application } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middlewares/errorMiddleware';

dotenv.config();

const app: Application = express();

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use(errorHandler);

export default app;
