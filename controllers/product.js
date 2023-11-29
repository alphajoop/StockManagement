const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  const { name, description, price, quantity, image } = req.body;

  // Validate the request body
  if (!name || !description || !price || !quantity || !image) {
    return res.status(400).json({ message: 'Incomplete product information' });
  }

  try {
    // Create a new instance of Product with the data from the request body
    const newProduct = new Product({
      name,
      description,
      price,
      quantity,
      image,
    });

    // Save the new product to the database
    const savedProduct = await newProduct.save();

    res.status(201).json({
      product: savedProduct,
      message: 'New product added successfully',
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Failed to add new product', error: error.message });
  }
};

exports.getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to fetch products', error: error.message });
  }
};

exports.getOneProduct = async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to fetch product', error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const productId = req.params.productId;
  const { name, description, price, quantity, image, userId } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        description,
        price,
        quantity,
        image,
        userId,
      },
      { new: true },
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ product, message: 'Product updated successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to update product', error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to delete product', error: error.message });
  }
};
