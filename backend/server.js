import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 6000
import cookieParser from 'cookie-parser';
import { NotFound, ErrorHandler } from './middleware/ErrorMiddleware.js';
import UserRoutes from './routes/UserRoutes.js';
import connectDB from './config/db.js';

connectDB();
const App = express();
App.use(express.json());
App.use(express.urlencoded({extended:true}));
App.use(cookieParser());

App.use('/api/users', UserRoutes)

App.get('/', (req, res)=>{
    res.send('Server is Bitching')
})

App.use(NotFound);
App.use(ErrorHandler);
App.listen(port, console.log(`Server is running on port ${port}`))
    