const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { productsMiddlewares } = require('../../../src/middlewares');
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
        name: 'Produto Teste1',
      },
    });
    const next = sinon.stub().returns();
    const req = {
      body: { name: 'Produto Teste1' },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsMiddlewares.nameExists(req, res, next);
    await productsMiddlewares.nameHasCorrectLength(req, res, next);
    await productsController.insertNewProduct(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({ id: 6, name: 'Produto Teste1' });
  });

  it('Retorna um status de BAD_REQUEST e uma mensagem de erro, ao tentar cadastrar um produto sem nome', async function () {
    const next = sinon.stub().returns();

    const req = {
      body: { },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsMiddlewares.nameExists(req, res, next);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });

  it('Retorna um status de INVALID_VALUE e uma mensagem de erro, ao tentar cadastrar um produto com nome menor que 5 caracteres', async function () {
    const next = sinon.stub().returns();

    const req = {
      body: { name: 'abc' },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsMiddlewares.nameHasCorrectLength(req, res, next);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });

  it('Retorna um status de SUCCESSFUL e o produto atualizado', async function () {
    sinon.stub(productsService, 'updateProduct').resolves({
      status: 'SUCCESSFUL',
      data: {
        id: 1,
        name: 'Produto Teste',
      },
    });

    const next = sinon.stub().returns();

    const req = {
      params: { id: 1 },
      body: { name: 'Produto Teste' },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsMiddlewares.nameExists(req, res, next);
    await productsMiddlewares.nameHasCorrectLength(req, res, next);
    await productsController.updateProduct(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ id: 1, name: 'Produto Teste' });
  });

  it('Retorna um status de 204 e nenhuma reposta quando o produto for deletado com sucesso', async function () {
    sinon.stub(productsService, 'deleteProduct').resolves({
      status: '204',
    });

    const req = {
      params: { id: 1 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.deleteProduct(req, res);
    expect(res.status).to.have.been.calledWith(204);
  });

  afterEach(function () {
    sinon.restore();
  });
});