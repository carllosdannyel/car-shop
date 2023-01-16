import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcyclesService from '../Services/MotorcyclesService';

export default class MotorcyclesController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcyclesService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcyclesService();
  }

  public async create() {
    const motorcycle: IMotorcycle = { ...this.req.body };

    const newMotorcycle = await this.service.create(motorcycle);
    return this.res.status(201).json(newMotorcycle);
  }

  public async find() {
    const motorcycles = await this.service.find();
    return this.res.status(200).json(motorcycles);
  }

  public async findById() {
    try {
      const { id } = this.req.params;
      const motorcycle = await this.service.findById(id);
      return this.res.status(200).json(motorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async update() {
    try {
      const { id } = this.req.params;
      const { ...obj } = this.req.body;
      const newMotorcycle = await this.service.update(id, obj);
      return this.res.status(200).json(newMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }
}
