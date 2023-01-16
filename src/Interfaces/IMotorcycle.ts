import IVehicle from './IVehicle';

export type Category = 'Street' | 'Custom' | 'Trail';

export default interface IMotorcycle extends IVehicle {
  category: Category;
  engineCapacity: number;
}