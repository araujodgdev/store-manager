const { salesModel } = require('../models');
const { validateId } = require('./validations/productsValidations');

const getAllSales = async () => {
  const data = await salesModel.getAll();
  return ({
    status: 'SUCCESSFUL',
    data,
  });
};

const getSaleById = async (saleId) => {
  const error = validateId(saleId);
  if (error) return ({ status: error.status, data: error.data });

  const [data] = await salesModel.getById(saleId);

  if (data.length === 0) {
    return ({
      status: 'NOT_FOUND',
      data: { message: 'Sale not found' },
    });
  }

  return ({
    status: 'SUCCESSFUL',
    data,
  });
};

const insertSale = async (productData) => {
  const data = await salesModel.insert(productData);

  return ({
    status: 'CREATED',
    data,
  });
};

module.exports = {
  getAllSales,
  getSaleById,
  insertSale,
};