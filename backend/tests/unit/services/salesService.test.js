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

  it('Atualiza a quantity de uma sale', async function () {
    sinon.stub(salesModel, 'getById').resolves([salesFromModel]);
    sinon.stub(salesModel, 'updateProductQuantityOnSale').resolves(saleFromModel);

    const { status, data } = await salesService.updateQuantityOnSale(1, 2, { quantity: 20 });

    expect(status).to.equal('SUCCESSFUL');
    expect(data).to.be.deep.equal({ ...salesFromModel[1], quantity: 20 });
  });

  it('NOT_FOUND caso não exista', async function () {
    sinon.stub(salesModel, 'getById').resolves([[]]);

    const { status, data } = await salesService.updateQuantityOnSale(8, 2, { quantity: 20 });

    expect(status).to.equal('NOT_FOUND');
    expect(data).to.be.deep.equal({ message: 'Sale not found' });
  });
  afterEach(function () {
    sinon.restore();
  });

  it('INVALID_VALUE caso a quantidade seja menor que 1', async function () {
    const { status, data } = await salesService.updateQuantityOnSale(1, 2, { quantity: 0 });

    expect(status).to.equal('INVALID_VALUE');
    expect(data).to.be.deep.equal({ message: '"quantity" must be greater than or equal to 1' });
  });

  it('BAD_REQUEST caso a quantidade não exista', async function () {
    const { status, data } = await salesService.updateQuantityOnSale(1, 2, {});

    expect(status).to.equal('BAD_REQUEST');
    expect(data).to.be.deep.equal({ message: '"quantity" is required' });
  });
  
  it('NOT_FOUND caso o product não exista', async function () {
    sinon.stub(salesModel, 'getById').resolves([salesFromModel]);

    const { status, data } = await salesService.updateQuantityOnSale(1, 8, { quantity: 20 });

    expect(status).to.equal('NOT_FOUND');
    expect(data).to.be.deep.equal({ message: 'Product not found in sale' });
  });
});