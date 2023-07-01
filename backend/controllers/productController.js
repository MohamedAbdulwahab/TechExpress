import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  // set products per page.
  const productsPerPage = 6;

  // search products.
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {};

  // get page number.
  const pageNumber = Number(req.query.pageNumber) || 1;

  // get the total number (count) of products.
  const count = await Product.countDocuments(keyword);

  // find and return products.
  const products = await Product.find({ ...keyword })
    .limit(productsPerPage)
    .skip(productsPerPage * (pageNumber - 1));

  if (products) {
    res.json({
      products,
      pageNumber,
      numberOfPages: Math.ceil(count / productsPerPage),
    });
  } else {
    res.status(404).json({ message: 'Product not Found :(' });
  }
});

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

// @desc    Delete a new product
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

// @desc    edit a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProductById = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
      },
      { new: true }
    );

    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// @desc    Create a new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment, submittedBy } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => String(r.submittedBy) === String(req.user._id)
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('You have reviewed this product before');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
      submittedBy,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getProducts,
  getProductById,
  createProduct,
  deleteProductById,
  updateProductById,
  createProductReview,
};
