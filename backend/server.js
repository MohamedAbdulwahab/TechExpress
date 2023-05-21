import * as dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import products from './data/products.js';

/* .env file must be located in root folder */
dotenv.config();

const app = express();

connectDB();

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((product) => {
    return product._id === req.params.id;
  });

  res.json(product);
});

const PORT = process.env.PORT;
app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
