const { productsService } = require('../services');
const { mapHTTPStatus } = require('../utils/mapStatusHTTP');

const getAllProducts = async (_req, res) => {
  try {
    const { status, data } = await productsService.getAllProducts();
    return res.status(mapHTTPStatus(status)).json(data);
  } catch (error) {
    return res.status(mapHTTPStatus(error)).send({ message: 'Internal Server Error' });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.getProductById(id);
  
  return res.status(mapHTTPStatus(status)).json(data);
};

module.exports = {
  getAllProducts,
  getProductById,
};