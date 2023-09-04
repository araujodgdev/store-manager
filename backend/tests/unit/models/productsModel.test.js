const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const {
  productsFromDB,
  productsFromModel,
} = require('../../mocks/models/productsMocks');

describe('Testa o model de produtos', function () {
  it('Lista todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDB]);

    const products = await productsModel.getAll();
    expect(products).to.be.deep.equal(productsFromModel);
  });

  it('Busca um produto pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDB[0]]);

    const product = await productsModel.getById(1);
    expect(product).to.be.deep.equal(productsFromModel[0]);
  });

  it('Insere um novo produto', async function () {
    sinon.stub(connection, 'execute').resolves([{
      insertId: 1,
    }]);

    const product = await productsModel.insert('Produto Teste');
    expect(product).to.be.deep.equal({
      id: 1,
      name: 'Produto Teste',
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});