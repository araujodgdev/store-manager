const { productIdSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = productIdSchema.validate(id);

  if (error) {
    return ({
      status: 'INVALID_DATA',
      data: { message: 'Invalid id' },
    });
  }
};

module.exports = {
  validateId,
};