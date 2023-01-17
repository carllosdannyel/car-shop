import Motorcycle from '../../../../src/Domains/Motorcycle';
import IMotocycle from '../../../../src/Interfaces/IMotorcycle';

export const motorcycleMocks: IMotocycle[] = [
  {
    id: '6348513f34c397abcad040b2',
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.990,
    category: 'Custom',
    engineCapacity: 5,
  },
  {
    id: '6348513f34c397abcad040b2',
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.990,
    category: 'Street',
    engineCapacity: 5,
  },
];

export const motorcycleInput: IMotocycle = {
  model: 'Corsa',
  year: 1988,
  color: 'Black',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 6,
};

export const motorcycleOutput: Motorcycle = new Motorcycle({
  id: '6348513f34c397abcad040b2',
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.990,
  category: 'Trail',
  engineCapacity: 5,
});
