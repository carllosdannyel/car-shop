import { Router } from 'express';
import MotorcyclesController from '../Controllers/MotorcyclesController';

const route = Router();

route.post(
  '/',
  (req, res, next) => new MotorcyclesController(req, res, next).create(),
);
route.get(
  '/',
  (req, res, next) => new MotorcyclesController(req, res, next).find(),
);
route.get(
  '/:id',
  (req, res, next) => new MotorcyclesController(req, res, next).findById(),
);

export default route;