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

const deleteSale = async (id) => {
  const [sale] = await salesModel.getById(id);

  if (sale.length === 0) {
    return ({
      status: 'NOT_FOUND',
      data: { message: 'Sale not found' },
    });
  }

  await salesModel.deleteSale(id);

  return ({
    status: '204',
  });
};

module.exports = {
  getAllSales,
  getSaleById,
  insertSale,
  deleteSale,
};