import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AdressSchema = new mongoose.Schema({
  street: { type: String, require: true },
  city: { type: String, require: true },
  region: { type: String, require: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const Address = mongoose.model("Address", AdressSchema);
