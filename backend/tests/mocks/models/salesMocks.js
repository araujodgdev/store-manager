const date = '2023-08-18T01:28:29.000Z';

const salesFromDB = [
    { saleId: 1, date, productId: 1, quantity: 5 },
    { saleId: 1, date, productId: 2, quantity: 10 },
    { saleId: 2, date, productId: 3, quantity: 15 },
];

const salesFromModel = [
    { saleId: 1, date, productId: 1, quantity: 5 },
    { saleId: 1, date, productId: 2, quantity: 10 },
    { saleId: 2, date, productId: 3, quantity: 15 },
];

const saleFromDB = [
    { date, productId: 1, quantity: 5 },
    { date, productId: 2, quantity: 10 },
];

const saleFromModel = [
    { date, productId: 1, quantity: 5 },
    { date, productId: 2, quantity: 10 },
];

const saleCreated = {
    status: 'CREATED',
    data: { id: 5, itemsSold: [{ productId: 1, quantity: 1 }] },
};

const saleNoQuantity = {
    status: 'INVALID_VALUE',
    data: { message: '"quantity" must be greater than or equal to 1' },
};

const saleInsert = [
    {
      productId: 1,
      quantity: 3,
    },
    {
      productId: 1,
      quantity: 10,
    },
];

const saleInsertWrongProductId = [
    {
      productId: 999,
      quantity: 3,
    },
    {
      productId: 2,
      quantity: 10,
    },
];

const saleInsertFromModel = [
    {
      productId: 1,
      quantity: 3,
    },
    {
      productId: 1,
      quantity: 10,
    },
];

const saleInsertRequest = {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 3,
    info: '',
    serverStatus: 2,
    warningStatus: 0,
};

module.exports = {
    salesFromDB,
    salesFromModel,
    saleFromDB,
    saleFromModel,
    saleCreated,
    saleNoQuantity,
    saleInsert,
    saleInsertRequest,
    saleInsertFromModel,
    saleInsertWrongProductId,
};