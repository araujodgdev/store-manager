const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const {
  productsFromModel,
} = require('../../mocks/models/productsMocks');

describe('Testa o controller de produtos', function () {
  it('Retorna um status de SUCCESSFUL e os produtos', async function () {
    sinon.stub(productsService, 'getAllProducts').resolves({
      status: 'SUCCESSFUL',
      data: productsFromModel,
    });

    const req = {};

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getAllProducts(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsFromModel);
  });

  it('Retorna um status de INTERNAL_SERVER_ERROR', async function () {
    sinon.stub(productsService, 'getAllProducts').resolves({
      status: undefined,
      data: undefined,
    });

    const req = {};

    const res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
    };

    await productsController.getAllProducts(req, res);
    expect(res.status).to.have.been.calledWith(500);
    expect(res.send).to.have.been.calledWith({
      message: 'Internal Server Error',
    });
  });

  it('Retorna um status de SUCCESSFUL e o produto por id', async function () {
    sinon.stub(productsService, 'getProductById').resolves({
      status: 'SUCCESSFUL',
      data: productsFromModel[0],
    });

    const req = {
      params: { id: 1 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getProductById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsFromModel[0]);
  });

  it('Retorna um status CREATED e o produto inserido', async function () {
    sinon.stub(productsService, 'insertProduct').resolves({
      status: 'CREATED',
      data: {
        id: 6,
        name: 'Produto Teste',
      },
    });

    const req = {
      body: { name: 'Produto Teste' },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await productsController.insertNewProduct(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({ id: 6, name: 'Produto Teste' });
  });

  afterEach(function () {
    sinon.restore();
  });
});