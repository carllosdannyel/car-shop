import IMotorcycle, { Category } from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

export default class Motorcycle extends Vehicle {
  private category: Category;
  private engineCapacity: number;

  constructor(motorcycleParams: IMotorcycle) {
    super(motorcycleParams);
    this.category = motorcycleParams.category;
    this.engineCapacity = motorcycleParams.engineCapacity;
  }
}
