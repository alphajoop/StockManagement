const express = require('express');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  );
  next();
});

const products = [
  {
    _id: 'oeihfzeoi',
    name: 'Product 1',
    description: 'Description of product 1',
    price: 10.99,
    quantity: 50,
    image:
      'https://cdn.pixabay.com/photo/2015/05/04/10/16/vegetables-752153_1280.jpg',
  },
  {
    _id: 'oeihfzeon',
    name: 'Product 2',
    description: 'Description of product 2',
    price: 19.99,
    quantity: 30,
    image:
      'https://cdn.pixabay.com/photo/2015/05/04/10/16/vegetables-752153_1280.jpg',
  },
];

// Create a new product
app.post('/api/products', (req, res) => {
  const { name, description, price, quantity, image } = req.body;
  console.log(req.body);

  // Validate the request body
  if (!name || !description || !price || !quantity || !image) {
    return res.status(400).json({ message: 'Incomplete product information' });
  }

  // Generate a unique ID
  const newProduct = {
    _id: Date.now().toString(),
    name,
    description,
    price,
    quantity,
    image,
  };

  // Add the new product to the products array
  products.push(newProduct);

  res
    .status(201)
    .json({ product: newProduct, message: 'New product added successfully' });
});

// Get all products
app.get('/api/products', (req, res) => {
  res.status(200).json(products);
});

module.exports = app;
