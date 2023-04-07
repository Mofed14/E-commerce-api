const Product = require("../models/product");
const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const createProduct = async (req, res) => {
  req.body.user = req.user.payload.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products, count: products.length });
};

const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate("reviews");
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

  const product = await Product.findOne({ _id: id });
  if (!product) {
    throw new CustomAPIError.BadRequest(`No products with this id ${id}`);
  }

  await product.remove();
  res.status(StatusCodes.OK).json({
    msg: "Success! Product Deleted.",
  });
};

const uploadImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "ecommerce",
    }
  );
  // after the image uploaded on cloudinary delete it from temp folder
  fs.unlinkSync(req.files.image.tempFilePath);
  res.status(StatusCodes.OK).json({
    image: {
      src: result.secure_url,
    },
  });
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  updateProduct,
  createProduct,
  deleteProduct,
  uploadImage,
};
