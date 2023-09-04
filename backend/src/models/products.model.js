const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products ORDER BY id ASC;',
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

const insert = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUES (?);',
    [name],
  );

  return { id: insertId, name };
};

const update = async (id, name) => {
  const [product] = await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?;',
    [name, id],
  );

  return product;
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
};