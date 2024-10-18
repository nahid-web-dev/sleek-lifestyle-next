import mongoose from 'mongoose';

export const AddressSchema = new mongoose.Schema({
  name: String,
  phone: {
    type: String,
    required: true,
  },
  villageName: String,
  upazila: String,
  email: {
    type: String,
  },
  createdAt: {
    type: String,
  },
});

const Address = mongoose.models.Address || mongoose.model('Address', AddressSchema);

export default Address;