import * as express from "express";
import carsController from "../controller/carsController";

const carsRoute = express.Router();

carsRoute.get("/api/v1/cars", carsController.get);
carsRoute.get("/api/v1/cars/:id", carsController.getById);
carsRoute.post("/api/v1/cars", carsController.create);
carsRoute.put("/api/v1/cars/:id", carsController.update);
carsRoute.put("/api/v1/cars/:id/finishBids", carsController.finishBids);
carsRoute.delete("/api/v1/cars/:id", carsController.delete);

export default carsRoute;
