const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { 
  salesFromModel, saleFromModel, saleInsertFromModel, saleInsertModel,
} = require('../../mocks/models/salesMocks');

describe('Testa o service de sales', function () {
  it('Retorna todas as sales com sucesso', async function () {
    sinon.stub(salesModel, 'getAll').resolves(salesFromModel);

    const { status, data } = await salesService.getAllSales();
    expect(status).to.equal('SUCCESSFUL');
    expect(data).to.be.deep.equal(salesFromModel);
  });

  it('Retorna uma sale pelo id com sucesso', async function () {
    sinon.stub(salesModel, 'getById').resolves([saleFromModel]);

    const { status, data } = await salesService.getSaleById(1);

    expect(status).to.equal('SUCCESSFUL');
    expect(data).to.be.deep.equal(saleFromModel);
  });

  it('Retorna um erro caso o id da sale não exista', async function () {
    sinon.stub(salesModel, 'getById').resolves([[]]);

    const { status, data } = await salesService.getSaleById(8);

    expect(status).to.equal('NOT_FOUND');
    expect(data).to.be.deep.equal({ message: 'Sale not found' });
  });

  it('Retorna um erro caso o id da sale não seja válido', async function () {
    const { status, data } = await salesService.getSaleById('abc');

    expect(status).to.equal('INVALID_DATA');
    expect(data).to.be.deep.equal({ message: 'Invalid id' });
  });

  it('Insere uma sale com sucesso', async function () {
    sinon.stub(salesModel, 'insert').resolves(saleInsertFromModel);

    const { status, data } = await salesService.insertSale(saleInsertModel);

    expect(status).to.equal('CREATED');
    expect(data).to.be.deep.equal(saleInsertFromModel);
  });

  it('Deleta uma sale com sucesso', async function () {
    sinon.stub(salesModel, 'getById').resolves([saleFromModel]);
    sinon.stub(salesModel, 'deleteSale').resolves(saleFromModel);

    const { status } = await salesService.deleteSale(1);

    expect(status).to.equal('204');
  });

  it('NOT_FOUND caso a sale não exista', async function () {
    sinon.stub(salesModel, 'getById').resolves([[]]);

    const { status, data } = await salesService.deleteSale(8);

    expect(status).to.equal('NOT_FOUND');
    expect(data).to.be.deep.equal({ message: 'Sale not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});