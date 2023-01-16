import { NextFunction, Request, Response } from 'express';
import Erro from '../utils/ErrorHandler';

class ErrorHandler {
  public static handle(
    error: Erro,
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    res.status(error.status || 500).json({ message: error.message });
    next();
  }
}

export default ErrorHandler;