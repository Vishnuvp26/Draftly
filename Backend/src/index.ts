import express from 'express';
import { env } from "process";
import cors from 'cors'
import connectDB from './config/db.config';
import validateEnv from './utils/validate.env';
import corsOption from './config/cors.config';
import cookieParser from 'cookie-parser';
import healthRoute from './config/health.config';
import { errorHandler } from './middleware/errorHandler';
import userRoute from './routes/userRoute';
import blogRoutes from './routes/blogRoutes'

connectDB();
validateEnv();

const app = express();

app.use(cookieParser());
app.use(cors(corsOption));
app.use(express.json());

app.use('/health', healthRoute);
app.use('/api', userRoute);
app.use('/api', blogRoutes)

app.use(errorHandler);

const PORT = env.PORT;

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
});