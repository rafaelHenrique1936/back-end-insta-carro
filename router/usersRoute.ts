import * as express from "express";
import usersController from "../controller/usersController";

const usersRoute = express.Router();

usersRoute.route("/api/v1/users").get(usersController.get);
usersRoute.route("/api/v1/users/:id").get(usersController.getById);
usersRoute.route("/api/v1/users").post(usersController.create);
usersRoute.route("/api/v1/users/:id").put(usersController.update);
usersRoute.route("/api/v1/users/:id").delete(usersController.delete);

export default usersRoute;