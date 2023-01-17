import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import Erro from '../utils/ErrorHandler';

export default class CarService {
  private carODM: CarODM = new CarODM();
  private NOT_FOUND = 'Car not found';

  private createCarDomain(car: ICar | null): Car | null {
    if (car) { return new Car(car); }
    return null;
  }

  public async create(car: ICar) {
    const newCar = await this.carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async find() {
    const cars = await this.carODM.find();
    return cars.map((car) => this.createCarDomain(car));
  }

  public async findById(_id: string) {
    const car = await this.carODM.findById(_id);
    if (!car) throw new Erro(404, this.NOT_FOUND);
    return this.createCarDomain(car);
  }

  public async update(_id: string, obj: ICar) {
    const newCar = await this.carODM.update(_id, { ...obj });
    if (!newCar) throw new Erro(404, this.NOT_FOUND);    
    return this.createCarDomain(newCar);
  }

  public async delete(_id: string) {
    const carDeleted = await this.carODM.delete(_id);
    if (!carDeleted) throw new Erro(404, this.NOT_FOUND);
  }
}
