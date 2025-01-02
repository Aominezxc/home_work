const fastify = require("fastify")({ logger: true });
const mongoose = require("mongoose");
require("dotenv").config();
const fastifyJwt = require("@fastify/jwt");
// const fastifyCookie = require("@fastify/cookie");

//Import routes
const userRoutes = require("./routes/user.routes");

//Connect to DB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to the DB"))
  .catch((e) => console.log("Error connecting to DB", e));

//Start server
fastify.register(userRoutes, { prefix: "/users" });

const start = async () =>
  await fastify.listen({ port: 5000 }, (err, address) => {
    if (err) {
      console.error(err);
    }
    console.log(`Server listening at ${address}`);
  });
start();
