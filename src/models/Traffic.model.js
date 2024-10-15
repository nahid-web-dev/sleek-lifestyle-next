import mongoose from 'mongoose';

const trafficSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String
  },
});

// Avoid recompiling the model
const Traffic = mongoose.models.Traffic || mongoose.model('Traffic', trafficSchema);

export default Traffic;