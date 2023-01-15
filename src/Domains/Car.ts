import ICar from '../Interfaces/ICar';

export default class Car {
  protected id?: string;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status?: boolean;
  protected buyValue: number;
  private doorsQty: number;
  private seatsQty: number;

  constructor(carParameters: ICar) {
    this.id = carParameters.id;
    this.model = carParameters.model;
    this.year = carParameters.year;
    this.color = carParameters.color;
    this.status = carParameters.status;
    this.buyValue = carParameters.buyValue;
    this.doorsQty = carParameters.doorsQty;
    this.seatsQty = carParameters.seatsQty;
  }
}
