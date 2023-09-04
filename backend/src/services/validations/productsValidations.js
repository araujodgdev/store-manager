const { productSchema } = require('./schemas');

const validateProductId = (productId) => {
  const { error } = productSchema.validate(productId);

  if (error) {
    return ({
      status: 'INVALID_DATA',
      data: { message: 'Invalid product id' },
    });
  }
};

module.exports = {
  validateProductId,
};