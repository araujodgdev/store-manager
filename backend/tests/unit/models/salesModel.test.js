const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const {
  salesFromDB,
  saleFromDB,
  salesFromModel,
  saleFromModel,
  saleInsertModel,
  saleInsertFromModel,
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

  it('Insere uma sale', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3, saleInsertModel }]);

    const sale = await salesModel.insert(saleInsertFromModel.itemsSold);
    expect(sale).to.be.deep.equal(saleInsertFromModel);
  });

  it('Deleta uma sale com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([saleFromDB]);

    const sale = await salesModel.deleteSale(1);
    expect(sale).to.be.deep.equal(saleFromModel);
  });

  it('Atualiza a quantity de uma sale', async function () {
    sinon.stub(connection, 'execute').resolves([{ ...salesFromDB[0], quantity: 20 }]);

    await salesModel.updateProductQuantityOnSale(1, 2, 20);
    const [updatedSale] = await salesModel.getById(1);
    expect(updatedSale).to.be.deep.equal({ ...salesFromDB[0], quantity: 20 });
  });

  afterEach(function () {
    sinon.restore();
  });
});