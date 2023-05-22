import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import Order from './models/orderModel.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // delete all orders
    await Order.deleteMany();

    // delete all users.
    await User.deleteMany();

    // delete all models.
    await Product.deleteMany();

    // insert users into the User model and save them into createdUsers variable.
    const createdUsers = await User.insertMany(users);

    // get the admin user.
    const adminUser = createdUsers[0]._id;

    // add admin user's id to all the products.
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // insert products into the Product model.
    await Product.insertMany(sampleProducts);

    // data imported successfully.
    console.log('Data imported successfully!');
    process.exit();
  } catch (error) {
    // log the error.
    console.error(error);

    // exit with failure.
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // delete all orders
    await Order.deleteMany();

    // delete all users.
    await User.deleteMany();

    // delete all models.
    await Product.deleteMany();

    // data destroy successfully.
    console.log('Data destroy successfully!');
    process.exit();
  } catch (error) {
    // log the error.
    console.error(error);

    // exit with failure.
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
