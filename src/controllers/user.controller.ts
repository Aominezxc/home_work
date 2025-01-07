import {User} from "../models/user.model";
import { Address } from "../models/address.model";
import { server } from "../server";
const bcrypt = require("bcrypt");
import mongoose from "mongoose";

export async function register(request) {
  const { email, password,role,name,age } = request.body;

  //Проверка пользователя
  const userExists = await User.findOne({ email });
  if (userExists) {
    return `Пользователь c email: ${email} уже существует`;
  }

  // Создание нового пользователя
  // const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password,role,name,age });
  newUser.save();
  return newUser;
}

export async function getHW(request) {
  return "Hello World";
}

export async function createUser(request, reply) {
  const create = new User(request.body);
  create.save();
  return { create, message: "User was successfuly created" };
}

export async function getAllUsers(request, reply) {
  const get = await User.find().populate("addresses");
  return get;
}

export async function getUserById(request, reply) {
  const get = await User.findById(request.params.id).populate("addresses");
  return get;
}

export async function updateUserById(request, reply) {
  await User.findByIdAndUpdate(request.params.id, request.body);
}

export async function deleteUserById(request, reply) {
  await User.findByIdAndDelete(request.params.id);
}

export async function getUsersAge30(request, reply) {
  const users = await User.find({ age: { $gte: 30 } });
  return users;
}
export async function getUsersAgeRange(request, reply) {
  const users = await User.find({ age: { $gte: 25, $lte: 35 } });
  return users;
}
export async function createBulkUsers(request, reply) {
  for (let i = 0; i < request.body.length; i++) {
    const create = await new User(request.body[i]);
    create.save();
  }
  return User.find();
}

export async function getFilteredUsers(request, reply) {
  const users = await User.find(request.query);
  return users;
}

export async function deleteBulkUsers(request, reply) {
  const userIds = request.body.id.map((id) => new mongoose.Types.ObjectId(id));
  return await User.deleteMany({ _id: { $in: userIds } });
}

export async function getSortedUsers(request, reply) {
  const res = await User.find().sort({ name: 1 });
  return res;
}

export async function getAgeStatsUsers(request, reply) {
  return await User.aggregate([
    {
      $group: {
        _id: null,
        avg: { $avg: "$age" },
        min: { $min: "$age" },
        max: { $max: "$age" },
      },
    },
  ]);
}

export async function updateMultipleUsers(request, reply) {
  for (let i = 0; i < request.body.length; i++) {
    const user = User.findOneAndUpdate(
      { _id: request.body[i]._id }, // Фильтр (найти пользователя с этим ID)
      { $set: { name: request.body[i].name } } // Обновление поля name
    );
    (await user).save();
  }
}
export async function getUniqueEmailsOfUsers(request, reply) {
  const uniq = await User.distinct("email");
  return uniq;
}
export async function replaceAllUsers(request, reply) {
  await User.deleteMany({});
  const newArray = await User.insertMany(request.body);
  return newArray;
}
export async function getUsersByNamePrefix(request, reply) {
  const users = await User.find({
    name: { $regex: request.params.name, $options: "i" },
  });
  return users;
}

export async function getUsersCount(request, reply) {
  const users = await User.countDocuments();
  return users;
}

export async function createUserWithAdress(request, reply) {
  const user = request.body.user._id
    ? await User.findById(new mongoose.Types.ObjectId(request.body.user._id))
    : await User.create(request.body.user);
  const address = await Address.create({
    userId: user._id,
    ...request.body.address,
  });

  return await User.updateOne(
    { _id: user._id },
    { $push: { addresses: address._id } }
  );
}


