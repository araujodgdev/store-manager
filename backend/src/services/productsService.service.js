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

const insertProduct = async (name) => {
  const data = await productsModel.insert(name);
  return ({
    status: 'CREATED',
    data,
  });
};

const updateProduct = async (id, name) => {
  const product = await productsModel.getById(id);

  if (product.length === 0) {
    return ({
      status: 'NOT_FOUND',
      data: { message: 'Product not found' },
    });
  }

  const data = await productsModel.update(id, name);

  if (data) {
    return ({
      status: 'SUCCESSFUL',
      data: { id: +id, name },
    });
  }
};

const deleteProduct = async (id) => {
  const product = await productsModel.getById(id);

  if (product.length === 0) {
    return ({
      status: 'NOT_FOUND',
      data: { message: 'Product not found' },
    });
  }

  await productsModel.deleteProduct(id);

  return ({
    status: '204',
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
  updateProduct,
  deleteProduct,
};