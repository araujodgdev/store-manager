const { productsModel } = require('../models');
const { validateProduct } = require('./validations/productsValidations');

const getAllProducts = async () => {
  const data = await productsModel.getAll();
  return ({
    status: 'SUCCESSFUL',
    data,
  });
};

const getProductById = async (productId) => {
  const error = validateProduct(productId);
  if (error) return ({ status: error.status, data: error.data });

  const data = await productsModel.getById(productId);

  if (!data) {
    return ({
      status: 'NOT_FOUND',
      data: { message: 'Product Not Found' },
    });
  }

  return ({
    status: 'SUCCESSFUL',
    data,
  });
};

module.exports = {
  getAllProducts,
  getProductById,
};