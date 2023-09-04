const Joi = require('joi');

const productIdSchema = Joi.number().integer().min(1);

module.exports = {
  productIdSchema,
};