import { fastify } from "fastify";
import mongoose from "mongoose";
require("dotenv").config();
import fastifyJwt from "@fastify/jwt";
export const server = fastify({ logger: true });

//Import routes
import { routes } from "./routes/user.routes";

//Register JWT
server.register(fastifyJwt, {
  secret: process.env.JWT_SIGNING_SECRET,
});

//Decorators
//jwtAuth (blablabla)
server.decorate("jwtAuth", async function (request, reply) {
  await request.jwtVerify().catch((err) => {
    reply.status(401).send({ message: "Unauthorized" });
  });
});
//hasRole
server.decorate("hasRole", function (role) {
  return async function(request, reply){
    const userRole = request.user.payload.role;
    if(role!==userRole){
      reply.status(403).send({ message:"Forbidden. Does not have correct role."});
    }
  }
});

//Connect to DB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to the DB"))
  .catch((e) => console.log("Error connecting to DB", e));

//Start server
server.register(routes, { prefix: "/users" });

// fastify.addHook("preHandler", auth)
// fastify.addHook("preHandler",basicAuth);

const start = async () =>
  await server.listen({ port: 5000 }, (err, address) => {
    if (err) {
      console.error(err);
    }
    console.log(`Server listening at ${address}`);
  });
start();
