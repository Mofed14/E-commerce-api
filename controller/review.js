const Review = require("../models/review");
const CustomAPIError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { checkPersmissions } = require("../utils");

const createReview = async (req, res) => {
  const { product } = req.body;
  if (!product) {
    throw new CustomAPIError.BadRequest("No product to review");
  }
  req.body.user = req.user.payload.userId;
  const review = await Review.create(req.body);

  res.status(StatusCodes.CREATED).json({
    review,
  });
};

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({})
    .populate({ path: "user", select: "name" })
    .populate({ path: "product", select: "name company price" });
  res.status(StatusCodes.OK).json({
    reviews,
  });
};

const getSingleReview = async (req, res) => {
  const { id } = req.params;
  const review = await Review.findById(id);
  if (!review) {
    throw new CustomAPIError.BadRequest(`No products with id ${id}`);
  }
  res.status(StatusCodes.OK).json({
    review,
  });
};

const updateReview = async (req, res) => {
  const { id } = req.params;
  const { rating, title, comment } = req.body;
  if (!rating || !title || !comment) {
    throw new CustomAPIError.BadRequest(
      "Please provide rating, title, and comment"
    );
  }
  const review = await Review.findById(id);
  if (!review) {
    throw new CustomAPIError.BadRequest(`No review with id ${id}`);
  }
  checkPersmissions(req.user.payload, review.user);

  review.rating = rating;
  review.title = title;
  review.comment = comment;
  await review.save();

  res.status(StatusCodes.OK).json({
    review,
  });
};

const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    throw new CustomAPIError.NotFound(`No Review with the id ${reviewId}`);
  }
  checkPersmissions(req.user.payload, review.user);
  await review.remove();
  res.status(StatusCodes.OK).json({ msg: "Successfully deleted the review" });
};

const getSingleProductReviews = async (req, res) => {
  const { id } = req.params;
  const reviews = await Review.find({ product: id });
  res.status(StatusCodes.OK).json({
    reviews,
    count: reviews.length,
  });
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  deleteReview,
  updateReview,
  getSingleProductReviews,
};
