const express = require('express');
const productsRoutes = require('./routes/productsRoutes');

const app = express();

app.use(express.json());
app.use('/products', productsRoutes);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;

// Iniciando o projeto.