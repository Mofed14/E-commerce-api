const Product = require("../models/product");
const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors");

const createProduct = async (req, res) => {
  req.body.user = req.user.payload.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products });
};

const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    throw new CustomAPIError.BadRequest(`No products with this id ${id}`);
  }
  res.status(StatusCodes.OK).json({
    product,
  });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    throw new CustomAPIError.BadRequest(`No products with this id ${id}`);
  }
  res.status(StatusCodes.OK).json({
    product,
  });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOneAndDelete(id, { new: true });
  if (!product) {
    throw new CustomAPIError.BadRequest(`No products with this id ${id}`);
  }
  res.status(StatusCodes.OK).json({
    msg: "Success! Product Deleted.",
  });
};

const uploadImage = async (req, res) => {
  res.send("upload image");
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  updateProduct,
  createProduct,
  deleteProduct,
  uploadImage,
};
