const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');

describe('Testa o model de produtos', function () {
  it('Lista todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([]);
  });
});