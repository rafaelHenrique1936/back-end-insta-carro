import * as express from "express";
import carsController from "../controller/carsController";

const carsRoute = express.Router();

carsRoute.route("/api/v1/cars").get(carsController.get);
carsRoute.route("/api/v1/cars/:id").get(carsController.getById);
carsRoute.route("/api/v1/cars").post(carsController.create);
carsRoute.route("/api/v1/cars/:id").put(carsController.update);
carsRoute.route("/api/v1/cars/:id/finishBids").put(carsController.finishBids);
carsRoute.route("/api/v1/cars/:id").delete(carsController.delete);

export default carsRoute;