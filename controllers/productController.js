const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  const { name, description, price, quantity, image } = req.body;

  // Validate the request body
  if (!name || !description || !price || !quantity || !image) {
    return res.status(400).json({ message: 'Incomplete product information' });
  }

  try {
    // Get the userId from the authenticated user
    const userId = req.auth.userId;

    // Create a new instance of Product with the data from the request body
    const newProduct = new Product({
      name,
      description,
      price,
      quantity,
      image,
      userId,
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
    // Get the userId from the authenticated user
    const userId = req.auth.userId;

    // Fetch products that belong to the authenticated user
    const products = await Product.find({ userId });
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

    // Check if the product belongs to the authenticated user
    if (product.userId !== req.auth.userId) {
      return res
        .status(403)
        .json({ message: 'Forbidden: Insufficient permissions' });
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
  const { name, description, price, quantity, image } = req.body;

  // Validate the request body
  if (!name || !description || !price || !quantity || !image) {
    return res.status(400).json({ message: 'Incomplete product information' });
  }

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the product belongs to the authenticated user
    if (product.userId !== req.auth.userId) {
      return res
        .status(403)
        .json({ message: 'Forbidden: Insufficient permissions' });
    }

    // Update the product
    product.name = name;
    product.description = description;
    product.price = price;
    product.quantity = quantity;
    product.image = image;

    // Save the updated product
    await product.save();

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
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the product belongs to the authenticated user
    if (product.userId !== req.auth.userId) {
      return res
        .status(403)
        .json({ message: 'Forbidden: Insufficient permissions' });
    }

    // Delete the product
    await Product.findByIdAndDelete(productId);

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to delete product', error: error.message });
  }
};
