import express from 'express';
import ErrorHandler from './Middlewares/ErrorHandler';
import carRouter from './Routes/CarRoute';
import motorcyclesRouter from './Routes/MotorcyclesRouter';

const app = express();
app.use(express.json());
app.use('/cars', carRouter);
app.use('/motorcycles', motorcyclesRouter);
app.use(ErrorHandler.handle);

export default app;
