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

const insertSale = async (req, res) => {
  const { body } = req;
  const { status, data } = await salesService.insertSale(body);

  return res.status(mapHTTPStatus(status)).json(data);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.deleteSale(id);
  res.status(mapHTTPStatus(status)).json(data || '');
};

module.exports = {
  getAllSales,
  getSaleById,
  insertSale,
  deleteSale,
};