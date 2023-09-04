const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { 
  productsFromModel,
} = require('../../mocks/models/productsMocks');

const NAME = 'Produto Teste';

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

  it('Insere um novo produto com sucesso', async function () {
    sinon.stub(productsModel, 'insert').resolves({
      id: 6,
      name: NAME,
    });

      const { status, data } = await productsService.insertProduct(NAME);

      expect(status).to.equal('CREATED');
      expect(data).to.be.deep.equal({ id: 6, name: NAME });
  });

  it('Atualiza um produto com sucesso', async function () {
    sinon.stub(productsModel, 'getById').resolves([productsFromModel[0]]);
    sinon.stub(productsModel, 'update').resolves(productsFromModel[0]);

    const { status, data } = await productsService.updateProduct(1, NAME);

    expect(status).to.equal('SUCCESSFUL');
    expect(data).to.be.deep.equal({ id: 1, name: NAME });
  });

  it('NOT_FOUND o id do produto não exista', async function () {
    sinon.stub(productsModel, 'getById').resolves([]);

    const { status, data } = await productsService.updateProduct(8, NAME);

    expect(status).to.equal('NOT_FOUND');
    expect(data).to.be.deep.equal({ message: 'Product not found' });
  });

  it('Deleta um produto com sucesso', async function () {
    sinon.stub(productsModel, 'getById').resolves([productsFromModel[0]]);
    sinon.stub(productsModel, 'deleteProduct').resolves(productsFromModel[0]);

    const { status } = await productsService.deleteProduct(1);

    expect(status).to.equal('204');
  });

  it('NOT_FOUND caso o id do produto não exista', async function () {
    sinon.stub(productsModel, 'getById').resolves([]);

    const { status, data } = await productsService.deleteProduct(8);

    expect(status).to.equal('NOT_FOUND');
    expect(data).to.be.deep.equal({ message: 'Product not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});