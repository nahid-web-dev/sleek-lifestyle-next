import mongoose from 'mongoose';
import { AddressSchema } from './Address.model';

const OrderedProducts = new mongoose.Schema({
  type: String,
  productId: String,
  price: Number,
  size: {
    type: String,
    default: 'M',
    enum: ['M', 'L', 'XL']
  },
  quantity: {
    type: Number,
    default: 1,
  },
  // add more product-specific fields
});

const OrderSchema = new mongoose.Schema({
  address: AddressSchema,
  products: [OrderedProducts],
  status: {
    type: String,
    enum: ['pending', 'canceled', 'placed', 'completed'],
    default: 'pending'
  },
  createdAt: {
    type: String,
  },
});

// mongoose.models.Order ||

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

export default Order;