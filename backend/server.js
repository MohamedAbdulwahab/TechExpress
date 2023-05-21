const express = require('express');
const products = require('./data/products');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((product) => {
    return product._id === req.params.id;
  });

  res.json(product);
});

const environment = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 5500;

app.listen(
  PORT,
  console.log(`server is running in ${environment} mode on port ${PORT}`)
);
