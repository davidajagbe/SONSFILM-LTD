import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
const port = process.env.PORT || 6000;
import cookieParser from 'cookie-parser';
import { NotFound, ErrorHandler } from './middleware/ErrorMiddleware.js';
import UserRoutes from './routes/UserRoutes.js';
import connectDB from './config/db.js';
import path from 'path';

connectDB();

const App = express();

App.use(express.json());
App.use(express.urlencoded({ extended: true }));

// Place cors middleware before route handlers
App.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

App.use(cookieParser());

App.use('/api/users', UserRoutes); // Re-enable UserRoutes

const __dirname = path.dirname(new URL(import.meta.url).pathname);
App.use('/uploads', express.static(path.join(__dirname, 'uploads')));

App.use(NotFound);
App.use(ErrorHandler);

App.listen(port, () => console.log(`Server is running on port ${port}`));