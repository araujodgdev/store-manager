const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const {
  salesFromModel, saleFromModel, saleInsertFromModel, saleInsertModel,
} = require('../../mocks/models/salesMocks');

describe('Testa o controller de sales', function () {
  it('Retorna um status de SUCCESSFUL e as sales', async function () {
    sinon.stub(salesService, 'getAllSales').resolves({
      status: 'SUCCESSFUL',
      data: salesFromModel,
    });

    const req = {};

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getAllSales(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesFromModel);
  });

  it('Retorna um status de SUCCESSFUL e a venda por id', async function () {
    sinon.stub(salesService, 'getSaleById').resolves({
      status: 'SUCCESSFUL',
      data: saleFromModel,
    });

    const req = {
      params: { id: 1 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getSaleById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleFromModel);
  });

  it('Retorna um status de CREATED e a venda inserida', async function () {
    sinon.stub(salesService, 'insertSale').resolves({
      status: 'CREATED',
      data: saleInsertFromModel,
    });

    const req = {
      body: saleInsertModel,
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await salesController.insertSale(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(saleInsertFromModel);
  });

  it('Retorna um status de 204 e nenhuma resposta', async function () {
    sinon.stub(salesService, 'deleteSale').resolves({
      status: '204',
      data: '',
    });

    const req = {
      params: { id: 1 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.deleteSale(req, res);
    expect(res.status).to.have.been.calledWith(204);
  });

  afterEach(function () {
    sinon.restore();
  });
});