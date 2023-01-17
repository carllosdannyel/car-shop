import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import { motorcycleMocks, motorcycleInput, motorcycleOutput } from './Mocks/MotocycleMocks';
import Motorcycle from '../../../src/Domains/Motorcycle';

const MOTORCYCLE_NOT_FOUND = 'Motorcycle not found';

describe('Testes na camada MotorcycleService', function () {
  it('Deve criar uma instância de Motorcycle com SUCESSO', async function () {
    const motorcycle = new Motorcycle(motorcycleMocks[0]);
    expect(motorcycle).to.be.instanceOf(Motorcycle);
  });

  it('Deve retornar null caso não passe o objeto para o Dominio', async function () {
    sinon.stub(Model, 'create').resolves(null);
      
    const service = new MotorcycleService();
    const result = await service.create(motorcycleInput);
      
    expect(result).to.be.equal(null);
  });

  it('POST /motorcycles - Cadastrando uma nova moto com SUCESSO', async function () {
    sinon.stub(Model, 'create').resolves(motorcycleOutput);
      
    const service = new MotorcycleService();
    const result = await service.create(motorcycleInput);
      
    expect(result).to.be.deep.equal(motorcycleOutput);
  });

  it('GET /motorcycles - Listando todos as motos', async function () {
    sinon.stub(Model, 'find').resolves(motorcycleMocks);
  
    const service = new MotorcycleService();
    const result = await service.find();
        
    expect(result).to.be.deep.equal(motorcycleMocks);
  });

  it(
    'GET /motorcycles/:id - Lançando exceção quando não encontra a moto pelo id', 
    async function () {
      const nonExistentId = '634852fd6b35b59438fbea31';

      sinon.stub(Model, 'findById').resolves();

      try {
        const service = new MotorcycleService();
        await service.findById(nonExistentId);
      } catch (error) {
        expect((error as Error).message).to.be.equal(MOTORCYCLE_NOT_FOUND);
      }
    },
  );

  it('GET /motorcycles/:id - Listando uma moto específica pelo id', async function () {
    sinon.stub(Model, 'findById').resolves(motorcycleMocks[0]);
  
    const service = new MotorcycleService();
    const result = await service.findById(motorcycleMocks[0].id as string);
        
    expect(result).to.be.deep.equal(motorcycleMocks[0]);
  });

  it('PUT /motorcycles/:id - Tentando editar uma moto que existe', async function () {
    const { id, ...motorcycle } = motorcycleMocks[1];

    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleMocks[1]);

    try {
      const service = new MotorcycleService();
      const newMotorcycle = await service.update(motorcycleMocks[0].id as string, motorcycle);
      expect(newMotorcycle).to.be.deep.equal(motorcycleMocks[1]);
    } catch (error) {
      expect((error as Error).message).to.be.equal(MOTORCYCLE_NOT_FOUND);
    }
  });

  it('PUT /cars:id - Tentando editar uma moto que não existe', async function () {
    const { id, ...cars } = motorcycleMocks[1];

    sinon.stub(Model, 'findByIdAndUpdate').resolves();

    try {
      const service = new MotorcycleService();
      await service.update(motorcycleMocks[0].id as string, cars);
    } catch (error) {
      expect((error as Error).message).to.be.equal(MOTORCYCLE_NOT_FOUND);
    }
  });

  it('DELETE /motorcycles/:id - Deletando um carro específico pelo id', async function () {
    sinon.stub(Model, 'findByIdAndDelete').resolves(motorcycleMocks[0]);
    try {
      const service = new MotorcycleService();
      const motorcycleDeleted = await service.delete(motorcycleMocks[0].id as string);
      expect(motorcycleDeleted).to.be.equal(undefined);
    } catch (error) {
      expect((error as Error).message).to.be.equal(MOTORCYCLE_NOT_FOUND);
    }
  });

  it(
    'DELETE /motorcycles/:id - Lançando erro quando não encontra a moto pelo id', 
    async function () {
      sinon.stub(Model, 'findByIdAndDelete').resolves();

      try {
        const service = new MotorcycleService();
        await service.delete(motorcycleMocks[0].id as string);
      } catch (error) {
        expect((error as Error).message).to.be.equal(MOTORCYCLE_NOT_FOUND);
      }
    },
  );

  afterEach(function () { return sinon.restore(); });
});