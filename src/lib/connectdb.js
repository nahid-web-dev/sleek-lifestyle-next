import mongoose from 'mongoose'

// Connect to MongoDB
const connectToDB = async () => {
  try {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log(error?.message)
  }
};

export default connectToDB