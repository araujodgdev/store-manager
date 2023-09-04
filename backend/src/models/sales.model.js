const camelize = require('camelize');
const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection.execute(
    `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity 
      FROM 
        sales AS s
      JOIN 
        sales_products sp 
      ON 
        s.id = sp.sale_id 
      ORDER BY 
        sale_id, product_id ASC;`,
  );
  return camelize(sales);
};

const getById = async (saleId) => {
  const sale = await connection.execute(
    `SELECT s.date, sp.product_id, sp.quantity 
      FROM 
        sales_products AS sp
      INNER JOIN 
        sales s 
      ON 
        sp.sale_id = s.id 
      WHERE sp.sale_id = ?
      ORDER BY 
        sp.sale_id, sp.product_id ASC;`,
    [saleId],
  );
  return camelize(sale);
};

const insert = async (productData) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (NOW());',
  );
  const salesProducts = productData
  .map(({ productId, quantity }) => [insertId, productId, quantity]);

  const promises = salesProducts.map((saleProduct) => connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
    saleProduct,
  ));
  await Promise.all(promises);
  return ({
    id: insertId,
    itemsSold: productData,
  });
};

module.exports = {
  getAll,
  getById,
  insert,
};