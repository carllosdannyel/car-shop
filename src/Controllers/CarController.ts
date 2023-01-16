import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const car: ICar = { ...this.req.body };

    const newCar = await this.service.create(car);
    return this.res.status(201).json(newCar);
  }

  public async find() {
    const cars = await this.service.find();
    return this.res.status(200).json(cars);
  }

  public async findById() {
    try {
      const { id } = this.req.params;
      const cars = await this.service.findById(id);
      return this.res.status(200).json(cars);
    } catch (error) {
      this.next(error);
    }
  }

  public async update() {
    try {
      const { id } = this.req.params;
      const { ...obj } = this.req.body;
      const newCar = await this.service.update(id, obj);
      return this.res.status(200).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async delete() {
    try {
      const { id } = this.req.params;
      await this.service.delete(id);
      return this.res.status(204).json('');
    } catch (error) {
      this.next(error);
    }
  }
}
