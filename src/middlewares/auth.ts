import {server} from '../server';
import {User} from "../models/user.model";
require("dotenv").config();
const bcrypt = require("bcrypt");

export async function jwtAuth(request,reply){

const {email,password} = request.body;
const user = await User.findOne({email})
console.log(user)
// console.log(user)
  if(!user){
    return reply.status(401).send({error:"User not found."})
}
  const isMatch = await bcrypt.compare(password, user.password)
  if(!isMatch){
    return reply.status(401).send({ error: "Incorrect password" });
  }
  const token = server.jwt.sign({payload:{
    email,role:user.role,name:user.name
  }})
  reply.send({token})
}
