import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  image: String,
  provider: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set to the current date
  },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;