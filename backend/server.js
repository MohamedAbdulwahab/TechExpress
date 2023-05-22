import * as dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

/* .env file must be located in root folder */
dotenv.config();

const app = express();

/* connect to Mongo database */
connectDB();

app.use('/api/products', productRoutes);

/* custom error handlers */
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
