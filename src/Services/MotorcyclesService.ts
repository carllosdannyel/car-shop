import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcyclesODM from '../Models/MotorcyclesODM';

export default class MotorcyclesService {
  private createCarDomain(motorcycles: IMotorcycle | null): Motorcycle | null {
    if (motorcycles) {
      return new Motorcycle(motorcycles);
    }
    return null;
  }

  public async create(motorcycles: IMotorcycle) {
    const motorcyclesODM = new MotorcyclesODM();
    const newMotorcycles = await motorcyclesODM.create(motorcycles);
    return this.createCarDomain(newMotorcycles);
  }
}
