// models/Product.js

import mongoose from 'mongoose';

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  oldPrice: Number,
  currentPrice: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0
  },
  hide: {
    type: Boolean,
    default: false,
  },
  showHome: {
    type: Boolean,
    default: false
  },
  showSlide: {
    type: Boolean,
    default: false
  },
  images: {
    type: [String], // Array of image URLs
    required: true,
    validate: {
      validator: function (v) {
        return v.length <= 3; // Limit to 3 images
      },
      message: props => `${props.value} exceeds the limit of 3 images!`,
    },
  },
  clickCount: {
    type: Number,
    default: 0,
  },
  orderCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: String,
  },
});

// Check if the model already exists to avoid recompilation errors
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;