const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection.execute(
    'SELECT * FROM sales ORDER BY saleId, productId ASC;',
  );
  return sales;
};

const getById = async (saleId) => {
  const [sale] = await connection.execute(
    'SELECT * FROM sales WHERE id = ?;',
    [saleId],
  );
  return sale;
};

module.exports = {
  getAll,
  getById,
};