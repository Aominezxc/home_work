import mongoose from "mongoose";
const Schema = mongoose.Schema;
 

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
    minLenght: 3,
    maxLength: 25,
  },
  age: { type: Number, require: true },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  role: [],
  addresses: [{ type: Schema.Types.ObjectId, ref: "Address" }],
  __v: { type: Number, select: false },
});


export const User = mongoose.model('User', UserSchema);

