const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String },
    price: { type: Number },
    description: { type: String },
    image: { type: String },
    category: { type: String },
    company: { type: String },
    colors: { type: [] },
    featured: { type: Boolean },
    freeShipping: { type: Boolean },
    inventory: { type: Number },
    averageRating: { type: Number },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
