import * as express from "express";
import usersController from "../controller/usersController";

const usersRoute = express.Router();

usersRoute.get("/api/v1/users", usersController.get);
usersRoute.get("/api/v1/users/:id", usersController.getById);
usersRoute.post("/api/v1/users", usersController.create);
usersRoute.put("/api/v1/users/:id", usersController.update);
usersRoute.delete("/api/v1/users/:id", usersController.delete);

export default usersRoute;
