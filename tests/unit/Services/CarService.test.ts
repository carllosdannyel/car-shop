import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import CarService from '../../../src/Services/CarService';
import { carMocks, carInput, carOutput } from './CarMocks';
import Car from '../../../src/Domains/Car';

const CAR_NOT_FOUND = 'Car not found';

describe('Testes na camada CarService', function () {
  it('Deve criar uma instância de Car com SUCESSO', function () {
    const car = new Car(carMocks[0]);
    expect(car).to.be.instanceOf(Car);
  });
    
  it('Deve retornar null caso não passe o objeto para o Dominio', async function () {
    sinon.stub(Model, 'create').resolves(null);
      
    const service = new CarService();
    const result = await service.create(carInput);
      
    expect(result).to.be.deep.equal(null);
  });
    
  it('POST /cars - Cadastrando um novo carro com SUCESSO', async function () {
    sinon.stub(Model, 'create').resolves(carOutput);

    const service = new CarService();
    const result = await service.create(carInput);
  
    expect(result).to.be.deep.equal(carOutput);
  });

  it('GET /cars - Listando todos os carros', async function () {
    sinon.stub(Model, 'find').resolves(carMocks);
  
    const service = new CarService();
    const result = await service.find();
        
    expect(result).to.be.deep.equal(carMocks);
  });

  it('GET /cars/:id - Listando um carro específico pelo id', async function () {
    sinon.stub(Model, 'findById').resolves(carMocks[0]);
  
    const service = new CarService();
    const result = await service.findById(carMocks[0].id as string);
        
    expect(result).to.be.deep.equal(carMocks[0]);
  });

  it('GET /cars/:id - Lançando exceção quando não encontra o carro pelo id', async function () {
    const nonExistentId = '634852fd6b35b59438fbea31';

    sinon.stub(Model, 'findById').resolves();

    try {
      const service = new CarService();
      await service.findById(nonExistentId);
    } catch (error) {
      expect((error as Error).message).to.be.equal(CAR_NOT_FOUND);
    }
  });

  it('PUT /cars:id - Tentando editar um carro que existe', async function () {
    const { id, ...cars } = carMocks[1];

    sinon.stub(Model, 'findByIdAndUpdate').resolves(carMocks[1]);

    try {
      const service = new CarService();
      const newCar = await service.update(carMocks[0].id as string, cars);
      expect(newCar).to.be.deep.equal(carMocks[1]);
    } catch (error) {
      expect((error as Error).message).to.be.equal(CAR_NOT_FOUND);
    }
  });

  it('PUT /cars:id - Tentando editar um carro que não existe', async function () {
    const { id, ...cars } = carMocks[1];

    sinon.stub(Model, 'findByIdAndUpdate').resolves();

    try {
      const service = new CarService();
      await service.update(carMocks[0].id as string, cars);
    } catch (error) {
      expect((error as Error).message).to.be.equal(CAR_NOT_FOUND);
    }
  });

  it('DELETE /cars/:id - Deletando um carro específico pelo id', async function () {
    sinon.stub(Model, 'findByIdAndDelete').resolves(carMocks[0]);
    try {
      const service = new CarService();
      const carDeleted = await service.delete(carMocks[0].id as string);
      expect(carDeleted).to.be.equal(undefined);
    } catch (error) {
      expect((error as Error).message).to.be.equal(CAR_NOT_FOUND);
    }
  });

  it('DELETE /cars/:id - Lançando erro quando não encontra o id do carro', async function () {
    sinon.stub(Model, 'findByIdAndDelete').resolves();

    try {
      const service = new CarService();
      await service.delete(carMocks[0].id as string);
    } catch (error) {
      expect((error as Error).message).to.be.equal(CAR_NOT_FOUND);
    }
  });

  afterEach(function () { return sinon.restore(); });
});
