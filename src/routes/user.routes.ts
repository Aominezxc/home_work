import * as userController from "../controllers/user.controller";
import { jwtAuth } from "../middlewares/auth";

export async function routes(fastify, options) {
  //Для админов
  fastify.post("/",{onRequest: [fastify.jwtAuth ,fastify.hasRole("admin")]}, userController.createUser);
  fastify.get("/", {onRequest: [fastify.jwtAuth ,fastify.hasRole("admin")]},userController.getAllUsers);
  fastify.get("/:id",{onRequest: [fastify.jwtAuth ,fastify.hasRole("admin")]}, userController.getUserById);
  fastify.put("/:id",{onRequest: [fastify.jwtAuth ,fastify.hasRole("admin")]}, userController.updateUserById);
  fastify.delete("/:id",{onRequest: [fastify.jwtAuth ,fastify.hasRole("admin")]}, userController.deleteUserById);
  fastify.get("/age30",{onRequest: [fastify.jwtAuth ,fastify.hasRole("admin")]}, userController.getUsersAge30);
  fastify.get("/age-range",{onRequest: [fastify.jwtAuth ,fastify.hasRole("admin")]}, userController.getUsersAgeRange);
  fastify.post("/bulk",{onRequest: [fastify.jwtAuth ,fastify.hasRole("admin")]}, userController.createBulkUsers);
  fastify.get("/filter",{onRequest: [fastify.jwtAuth ,fastify.hasRole("admin")]}, userController.getFilteredUsers);
  fastify.delete("/bulk",{onRequest: [fastify.jwtAuth ,fastify.hasRole("admin")]}, userController.deleteBulkUsers);
  fastify.get("/sort",{onRequest: [fastify.jwtAuth ,fastify.hasRole("admin")]}, userController.getSortedUsers);
  fastify.get("/age-stats",{onRequest: [fastify.jwtAuth ,fastify.hasRole("admin")]}, userController.getAgeStatsUsers);
  fastify.patch("/update-multiple",{onRequest: [fastify.jwtAuth ,fastify.hasRole("admin")]}, userController.updateMultipleUsers);
  fastify.get("/unique-emails",{onRequest: [fastify.jwtAuth ,fastify.hasRole("admin")]}, userController.getUniqueEmailsOfUsers);
  fastify.put("/replace-all",{onRequest: [fastify.jwtAuth ,fastify.hasRole("admin")]}, userController.replaceAllUsers);
  fastify.get("/name-prefix/:name",{onRequest: [fastify.jwtAuth ,fastify.hasRole("admin")]}, userController.getUsersByNamePrefix);
  fastify.get("/count",{onRequest: [fastify.jwtAuth ,fastify.hasRole("admin")]}, userController.getUsersCount);
  fastify.post("/createuwa",{onRequest: [fastify.jwtAuth ,fastify.hasRole("admin")]}, userController.createUserWithAdress);
  //Для пользователей , который прошли аунтефикацию
  fastify.get("/getHW",{onRequest:fastify.jwtAuth}, userController.getHW);
  // login/register
  fastify.post("/login", jwtAuth);
  fastify.post("/register", userController.register);
}
