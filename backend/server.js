import * as dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import session from 'express-session';
import passport from 'passport';
import configurePassport from './config/passport.js';
import MongoStore from 'connect-mongo';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';

/* .env file must be located in root folder */
dotenv.config();

const app = express();

/* Passport config */
configurePassport(passport);

/* connect to Mongo database */
connectDB();

// Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);

/* Passport middleware */
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/products', productRoutes);

/* custom error handlers */
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5500;
app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
