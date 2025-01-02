import { ObjectId } from "@fastify/mongodb";
import { User } from "../models/user.model";
import { Address } from "../models/address.model";
import { Types } from "mongoose";
const mongoose = require("mongoose");

async function register(request) {}

async function login(request, reply) {
  const { username, password } = request.body;
  if (password !== "admin") {
    return "Аутефикация не прошла";
  }
}

async function getHW(request) {
  console.log("Hello World");
}

async function createUser(request, reply) {
  const create = new User(request.body);
  create.save();
  return User.find();
}

async function getAllUsers(request, reply) {
  const get = await User.find();
  return get;
}

async function getUserById(request, reply) {
  const get = await User.findById(request.params.id).populate("addresses");
  return get;
}

async function updateUserById(request, reply) {
  await User.findByIdAndUpdate(request.params.id, request.body);
}

async function deleteUserById(request, reply) {
  await User.findByIdAndDelete(request.params.id);
}

async function getUsersAge30(request, reply) {
  const users = await User.find({ age: { $gte: 30 } });
  return users;
}
async function getUsersAgeRange(request, reply) {
  const users = await User.find({ age: { $gte: 25, $lte: 35 } });
  return users;
}
async function createBulkUsers(request, reply) {
  for (let i = 0; i < request.body.length; i++) {
    const create = await new User(request.body[i]);
    create.save();
  }
  return User.find();
}

async function getFilteredUsers(request, reply) {
  const users = await User.find(request.query);
  return users;
}

async function deleteBulkUsers(request, reply) {
  const userIds = request.body.id.map((id) => new mongoose.Types.ObjectId(id));
  return await User.deleteMany({ _id: { $in: userIds } });
}

async function getSortedUsers(request, reply) {
  const res = await User.find().sort({ name: 1 });
  return res;
}

async function getAgeStatsUsers(request, reply) {
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

async function updateMultipleUsers(request, reply) {
  for (let i = 0; i < request.body.length; i++) {
    const user = User.findOneAndUpdate(
      { _id: request.body[i]._id }, // Фильтр (найти пользователя с этим ID)
      { $set: { name: request.body[i].name } } // Обновление поля name
    );
    (await user).save();
  }
}
async function getUniqueEmailsOfUsers(request, reply) {
  const uniq = await User.distinct("email");
  return uniq;
}
async function replaceAllUsers(request, reply) {
  await User.deleteMany({});
  const newArray = await User.insertMany(request.body);
  return newArray;
}
async function getUsersByNamePrefix(request, reply) {
  const users = await User.find({
    name: { $regex: request.params.name, $options: "i" },
  });
  return users;
}

async function getUsersCount(request, reply) {
  const users = await User.countDocuments();
  return users;
}

async function createUserWithAdress(request, reply) {
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

module.exports = {
  createUserWithAdress,
  getAgeStatsUsers,
  getAllUsers,
  getFilteredUsers,
  getSortedUsers,
  getUniqueEmailsOfUsers,
  getUserById,
  getUsersAge30,
  getUsersAgeRange,
  getUsersByNamePrefix,
  getUsersCount,
  createBulkUsers,
  createUser,
  deleteBulkUsers,
  deleteUserById,
  updateMultipleUsers,
  updateUserById,
  replaceAllUsers,
  getHW,
  login,
  register,
};
