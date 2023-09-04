const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { 
  productsFromModel,
} = require('../../mocks/models/productsMocks');

describe('Testa o service de produtos', function () {
  it('Retorna todos os produtos com sucesso', async function () {
    sinon.stub(productsModel, 'getAll').resolves(productsFromModel);

    const { status, data } = await productsService.getAllProducts();
    expect(status).to.equal('SUCCESSFUL');
    expect(data).to.be.deep.equal(productsFromModel);
  });

  it('Retorna um produto pelo id com sucesso', async function () {
    sinon.stub(productsModel, 'getById').resolves([productsFromModel[0]]);

    const { status, data } = await productsService.getProductById(1);

    expect(status).to.equal('SUCCESSFUL');
    expect(data).to.be.deep.equal(productsFromModel[0]);
  });

  it('Retorna um erro caso o id do produto não exista', async function () {
    sinon.stub(productsModel, 'getById').resolves([]);

    const { status, data } = await productsService.getProductById(8);

    expect(status).to.equal('NOT_FOUND');
    expect(data).to.be.deep.equal({ message: 'Product not found' });
  });

  it('Retorna um erro caso o id do produto não seja válido', async function () {
    const { status, data } = await productsService.getProductById('abc');

    expect(status).to.equal('INVALID_DATA');
    expect(data).to.be.deep.equal({ message: 'Invalid id' });
  });

  afterEach(function () {
    sinon.restore();
  });
});