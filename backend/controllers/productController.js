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

export { getProducts, getProductById };
