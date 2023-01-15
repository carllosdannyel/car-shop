import {
  Schema,
} from 'mongoose';
import ICar from '../Interfaces/ICar';
import Car from '../Domains/Car';
import AbstractODM from './AbstractODM';

export default class CarODM extends AbstractODM<ICar> {
  constructor() {
    const schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: true, default: false },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    super(schema, 'Car');
  }

  public async createCar(car: ICar): Promise<Car> {
    const newCar = await this.model.create({ ...car });
    return new Car({ ...newCar });
  }
}
