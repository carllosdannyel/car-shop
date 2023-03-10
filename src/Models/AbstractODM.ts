import { Model, Schema, models, model, isValidObjectId, UpdateQuery } from 'mongoose';
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

  private isValidObjectId(_id: string) {
    if (!isValidObjectId(_id)) {
      throw new Erro(422, 'Invalid mongo id');
    }
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

  public async findById(_id: string): Promise<T | null> {
    this.isValidObjectId(_id);
    return this._model.findById(_id);
  }

  public async update(_id: string, obj: Partial<T>): Promise<T | null> {
    this.isValidObjectId(_id);
    return this._model.findByIdAndUpdate(
      { _id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );
  }

  public async delete(_id: string): Promise<T | null> {
    this.isValidObjectId(_id);
    return this._model.findByIdAndDelete(_id);
  }
}
