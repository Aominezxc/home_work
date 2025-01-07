import mongoose,{Document, Schema} from "mongoose";
const bcrypt = require("bcrypt");

export const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
    trim: true,
    minLenght: 3,
    maxLength: 25,
    default: "username",
  },
  age: { type: Number, require: true },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: true,
    unique: true,
    minLenght: 6,
    maxLenght: 21,
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

  addresses: [{ type: Schema.Types.ObjectId, ref: "Address" }],
  __v: { type: Number, select: false },
});

UserSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password") || this.isNew) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  } catch (error) {
    next(error);
  }
});

export const User = mongoose.model("User", UserSchema);

