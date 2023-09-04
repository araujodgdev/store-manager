const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products;',
  );
  return products;
};

const getById = async (productId) => {
  const [product] = await connection.execute(
    'SELECT * FROM products WHERE id = ? ORDER BY id ASC;',
    [productId],
  );
  return product;
};

module.exports = {
  getAll,
  getById,
};