import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    // find all products.
    const products = await Product.find({});

    // response with all products in json format.
    res.json(products);
  } catch (error) {
    res.status(404).json({ message: 'Product not Found :(' });
  }
};

// @desc    Fetch a single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    // find a product by its ID.
    const product = await Product.findById(req.params.id);

    // response with the single product found in json format.
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: 'Product not Found :(' });
  }
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  // create a new product.
  const product = await Product.create({
    name: 'sample name',
    price: 0,
    user: req.user._id,
    image: '/images/airpods.jpg',
    brand: 'sample brand',
    category: 'sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'sample discription',
  });

  if (product) {
    // response with newly created product in json format.
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Failed to create a new product' });
    throw new Error('Failed to create a new product');
  }
});

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
const deleteProductById = asyncHandler(async (req, res) => {
  // find the product to be deleted.
  const product = await Product.findById(req.params.id);

  // product exists.
  if (product) {
    // response with all products in json format.
    await Product.deleteOne({ _id: product._id });
    res.status(200).json('product deleted');
  } else {
    res.status(404);
    throw new Error('product not found');
  }
});

export { getProducts, getProductById, createProduct, deleteProductById };
