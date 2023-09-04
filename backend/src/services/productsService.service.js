const { productsModel } = require('../models');
const { validateId } = require('./validations/productsValidations');

const getAllProducts = async () => {
  const data = await productsModel.getAll();
  return ({
    status: 'SUCCESSFUL',
    data,
  });
};

const getProductById = async (productId) => {
  const error = validateId(productId);
  if (error) return ({ status: error.status, data: error.data });

  const [data] = await productsModel.getById(productId);

  if (data === undefined) {
    return ({
      status: 'NOT_FOUND',
      data: { message: 'Product not found' },
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