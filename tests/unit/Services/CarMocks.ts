import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';

export const carMocks: ICar[] = [
  {
    id: '6348513f34c397abcad040b2',
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.990,
    doorsQty: 4,
    seatsQty: 5,
  },
  {
    id: '6348513f34c397abcad040b2',
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.990,
    doorsQty: 4,
    seatsQty: 5,
  },
];

export const carInput: ICar = {
  model: 'Corsa',
  year: 1988,
  color: 'Black',
  status: true,
  buyValue: 30.000,
  doorsQty: 4,
  seatsQty: 6,
};

export const carOutput: Car = new Car({
  id: '6348513f34c397abcad040b2',
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.990,
  doorsQty: 4,
  seatsQty: 5,
});
