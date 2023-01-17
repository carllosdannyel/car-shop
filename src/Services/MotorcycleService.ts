import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcyclesODM from '../Models/MotorcyclesODM';
import Erro from '../utils/ErrorHandler';

export default class MotorcycleService {
  private motorcyclesODM: MotorcyclesODM = new MotorcyclesODM();
  private NOT_FOUND = 'Motorcycle not found';

  private createCarDomain(motorcycles: IMotorcycle | null): Motorcycle | null {
    if (motorcycles) { return new Motorcycle(motorcycles); }
    return null;
  }

  public async create(motorcycles: IMotorcycle): Promise<Motorcycle | null> {
    const newMotorcycles = await this.motorcyclesODM.create(motorcycles);
    return this.createCarDomain(newMotorcycles);
  }

  public async find() {
    const motorcycles = await this.motorcyclesODM.find();
    return motorcycles.map((motorcycle) => this.createCarDomain(motorcycle));
  }

  public async findById(_id: string) {
    const motorcycle = await this.motorcyclesODM.findById(_id);
    if (!motorcycle) throw new Erro(404, this.NOT_FOUND);
    return this.createCarDomain(motorcycle);
  }

  public async update(_id: string, obj: IMotorcycle) {
    const newCar = await this.motorcyclesODM.update(_id, { ...obj });
    if (!newCar) throw new Erro(404, this.NOT_FOUND);
    return this.createCarDomain(newCar);
  }

  public async delete(_id: string) {
    const motorcycleDeleted = await this.motorcyclesODM.delete(_id);
    if (!motorcycleDeleted) throw new Erro(404, this.NOT_FOUND);
  }
}
