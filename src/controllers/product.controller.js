const productService = require('../services/product.service');

const createProduct = async (req, res) => {
  try {
    console.log(req.body);
    const product = await productService.createProduct(req.body);
    return res.status(201).send(product);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productService.deleteProduct(productId);
    return res.status(200).send(product);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productService.updateProduct(productId, req.body);
    return res.status(201).send(product);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const findProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productService.findProductById(productId);
    return res.status(200).send(product);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts(req.query);
    return res.status(200).send(products);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const createMultipleProduct = async (req, res) => {
  try {
    await productService.createMultipleProduct(req.body);
    return res.status(200).send({ message: 'Products created successfully' });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  findProductById,
  getAllProducts,
  createMultipleProduct,
};
