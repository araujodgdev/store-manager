const route = require('express').Router();
const { productsMiddlewares } = require('../middlewares');
const { productsController } = require('../controllers');

route.get('/', productsController.getAllProducts);

route.get('/:id', productsController.getProductById);

route
  .post(
    '/',
    productsMiddlewares.nameExists,
    productsMiddlewares.nameHasCorrectLength,
    productsController.insertNewProduct,
  );

module.exports = route;