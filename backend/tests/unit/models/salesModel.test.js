const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const {
  salesFromDB,
  saleFromDB,
  salesFromModel,
  saleFromModel,
} = require('../../mocks/models/salesMocks');

describe('Testa o model de sales', function () {
  it('Lista todas as sales', async function () {
    sinon.stub(connection, 'execute').resolves([salesFromDB]);

    const sales = await salesModel.getAll();
    expect(sales).to.be.deep.equal(salesFromModel);
  });

  it('Busca uma sale pelo id', async function () {
    sinon.stub(connection, 'execute').resolves(saleFromDB);

    const sale = await salesModel.getById(1);
    expect(sale).to.be.deep.equal(saleFromModel);
  });

  afterEach(function () {
    sinon.restore();
  });
});