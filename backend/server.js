import * as dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';

/* .env file must be located in root folder */
dotenv.config();

const app = express();

connectDB();

app.use('/api/products', productRoutes);

const PORT = process.env.PORT;
app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
