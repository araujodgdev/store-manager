const { salesModel, productsModel } = require('../models');
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

const verifyQuantity = ({ quantity }) => {
  if (quantity <= 0) {
    return ({
      status: 'INVALID_VALUE',
      data: { message: '"quantity" must be greater than or equal to 1' },
    });
  }
  if (!quantity) {
    return ({
      status: 'BAD_REQUEST',
      data: { message: '"quantity" is required' },
    });
  }

  return undefined;
};

const hasProductId = (productData) => {
  if (!productData.productId) {
    return ({
      status: 'BAD_REQUEST',
      data: { message: '"productId" is required' },
    });
  }

  return undefined;
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

const insertSale = async (productData) => {
  const ProductIdErrors = productData.map((product) => hasProductId(product));
  if (ProductIdErrors.some((error) => error !== undefined)) {
    return ({ status: 'BAD_REQUEST', data: { message: '"productId" is required' },
    });
  }
  const quantityErrors = productData.map((product) => verifyQuantity(product));
  if (quantityErrors.some((error) => error !== undefined)) {
    const error = quantityErrors.find((err) => err !== undefined);
    return ({ status: error.status, data: error.data });
  }
  const productErrors = productData.map((product) => getProductById(product.productId));
  const productErrorsResolved = await Promise.all(productErrors);
  if (productErrorsResolved.some((error) => error.status === 'NOT_FOUND')) {
    return ({ status: 'NOT_FOUND', data: { message: 'Product not found' } });
  }
  const data = await salesModel.insert(productData);
  return ({ status: 'CREATED', data });
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

const pnf = 'Product not found in sale';

const updateQuantityOnSale = async (id, prodId, quant) => {
  const error = verifyQuantity(quant);
  if (error) return ({ status: error.status, data: error.data });
  const product = await getProductById(prodId);
  if (product.status === 'NOT_FOUND') return ({ status: 'NOT_FOUND', data: { message: pnf } });
  const saleError = await getSaleById(id);
  if (saleError.status === 'NOT_FOUND') {
return ({ status: 'NOT_FOUND', data: { message: 'Sale not found' },
    });
  }
  const newQuant = quant.quantity;
  await salesModel.updateProductQuantityOnSale(id, prodId, newQuant);
  const [updatedSale] = await salesModel.getById(id);
  const { date } = updatedSale[0];
  return ({ status: 'SUCCESSFUL', 
    data: { date, productId: Number(prodId), quantity: newQuant, saleId: Number(id) },
  });
};

module.exports = {
  getAllSales,
  getSaleById,
  insertSale,
  deleteSale,
  updateQuantityOnSale,
};