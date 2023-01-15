import express from 'express';
import ErrorHandler from './Middlewares/ErrorHandler';
import carRouter from './Routes/CarRoute';

const app = express();
app.use(express.json());
app.use('/cars', carRouter);
app.use(ErrorHandler.handle);

export default app;
