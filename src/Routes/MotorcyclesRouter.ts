import { Router } from 'express';
import MotorcyclesController from '../Controllers/MotorcyclesController';

const route = Router();

route.post(
  '/',
  (req, res, next) => new MotorcyclesController(req, res, next).create(),
);

export default route;