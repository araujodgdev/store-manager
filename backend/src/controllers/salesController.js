const { salesService } = require('../services');
const { mapHTTPStatus } = require('../utils/mapStatusHTTP');

const getAllSales = async (_req, res) => {
    const { status, data } = await salesService.getAllSales();
    return res.status(mapHTTPStatus(status)).json(data);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.getSaleById(id);
  
  return res.status(mapHTTPStatus(status)).json(data);
};

module.exports = {
  getAllSales,
  getSaleById,
};