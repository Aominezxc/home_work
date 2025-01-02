const userController = require("../controllers/user.controller");
const adressController = require("../controllers/adress.controller");

async function routes(fastify,options) {
    //Для админов
    fastify.post("/", userController.createUser);
    fastify.get("/", userController.getAllUsers);
    fastify.get("/:id", userController.getUserById);
    fastify.put("/:id", userController.updateUserById);
    fastify.delete("/:id", userController.deleteUserById);
    fastify.get("/age30", userController.getUsersAge30);
    fastify.get("/age-range", userController.getUsersAgeRange);
    fastify.post("/bulk", userController.createBulkUsers);
    fastify.get("/filter", userController.getFilteredUsers);
    fastify.delete("/bulk", userController.deleteBulkUsers);
    fastify.get("/sort", userController.getSortedUsers);
    fastify.get("/age-stats", userController.getAgeStatsUsers);
    fastify.patch("/update-multiple", userController.updateMultipleUsers);
    fastify.get("/unique-emails", userController.getUniqueEmailsOfUsers);
    fastify.put("/replace-all", userController.replaceAllUsers);
    fastify.get("/name-prefix/:name", userController.getUsersByNamePrefix);
    fastify.get("/count", userController.getUsersCount);   
    fastify.post("/createuwa",userController.createUserWithAdress);
    //Для пользователей , который прошли аунтефикацию 
    fastify.get("/getHW",userController.getHW);
    // login/register
    fastify.post("/login", userController.login);
    fastify.post("/register", userController.register);
}

module.exports = routes;