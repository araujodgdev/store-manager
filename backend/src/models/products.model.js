const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products;',
  );
  return products;
};

const getById = async (productId) => {
  const [product] = await connection.execute(
    'SELECT * FROM products WHERE id = ?;',
    [productId],
  );
  return product;
};

module.exports = {
  getAll,
  getById,
};