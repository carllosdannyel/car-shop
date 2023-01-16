import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcyclesODM from '../Models/MotorcyclesODM';
import Erro from '../utils/ErrorHandler';

const NOT_FOUND = 'Motorcycle not found';

export default class MotorcyclesService {
  private createCarDomain(motorcycles: IMotorcycle | null): Motorcycle | null {
    if (motorcycles) {
      return new Motorcycle(motorcycles);
    }
    return null;
  }

  public async create(motorcycles: IMotorcycle): Promise<Motorcycle | null> {
    const motorcyclesODM = new MotorcyclesODM();
    const newMotorcycles = await motorcyclesODM.create(motorcycles);
    return this.createCarDomain(newMotorcycles);
  }

  public async find() {
    const motorcyclesODM = new MotorcyclesODM();
    const motorcycles = await motorcyclesODM.find();
    return motorcycles.map((motorcycle) => this.createCarDomain(motorcycle));
  }

  public async findById(_id: string) {
    const motorcyclesODM = new MotorcyclesODM();
    const motorcycle = await motorcyclesODM.findById(_id);
    if (!motorcycle) throw new Erro(404, NOT_FOUND);
    return this.createCarDomain(motorcycle);
  }

  public async update(_id: string, obj: IMotorcycle) {
    const motorcyclesODM = new MotorcyclesODM();
    const motorcycle = await motorcyclesODM.findById(_id);
    if (!motorcycle) throw new Erro(404, NOT_FOUND);
    const newCar = await motorcyclesODM.update(_id, { ...obj });
    return this.createCarDomain(newCar);
  }

  public async delete(_id: string) {
    const motorcyclesODM = new MotorcyclesODM();
    const motorcycle = await motorcyclesODM.findById(_id);
    if (!motorcycle) throw new Erro(404, NOT_FOUND);
    await motorcyclesODM.delete(_id);
    return '';
  }
}
