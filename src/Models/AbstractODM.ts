import { Model, Schema, models, model, isValidObjectId } from 'mongoose';
import Erro from '../utils/ErrorHandler';

export default abstract class AbstractODM<T> {
  private schema: Schema<T>;
  private _model: Model<T>;
  private modelName: string;

  constructor(schema: Schema<T>, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this._model = models[this.modelName] || model(this.modelName, this.schema);
  }

  protected get model(): Model<T> {
    return this._model;
  }

  public async create(obj: T): Promise<T> {
    return this._model.create({ ...obj });
  }

  public async find(): Promise<T[]> {
    return this._model.find();
  }

  public async findById(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) throw new Erro(422, 'Invalid mongo id');
    return this._model.findById(id);
  }
}
