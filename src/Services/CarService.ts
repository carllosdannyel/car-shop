import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import Erro from '../utils/ErrorHandler';

const NOT_FOUND = 'Car not found';

export default class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async create(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async find() {
    const carODM = new CarODM();
    const cars = await carODM.find();
    return cars.map((car) => this.createCarDomain(car));
  }

  public async findById(_id: string) {
    const carODM = new CarODM();
    const car = await carODM.findById(_id);
    if (!car) throw new Erro(404, NOT_FOUND);
    return this.createCarDomain(car);
  }

  public async update(_id: string, obj: ICar) {
    const carODM = new CarODM();
    const car = await carODM.findById(_id);
    if (!car) throw new Erro(404, NOT_FOUND);
    const newCar = await carODM.update(_id, { ...obj });
    return this.createCarDomain(newCar);
  }

  public async delete(_id: string) {
    const carODM = new CarODM();
    const car = await carODM.findById(_id);
    if (!car) throw new Erro(404, NOT_FOUND);
    await carODM.delete(_id);
    return '';
  }
}
