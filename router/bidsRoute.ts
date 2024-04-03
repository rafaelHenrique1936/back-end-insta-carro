import * as express from "express";
import bidsController from "../controller/bidsController";

const bidsRoute = express.Router();

bidsRoute.get("/api/v1/bids/cars/:id", bidsController.getByCar);
bidsRoute.get("/api/v1/bids/cars/:id/last", bidsController.getLastId);
bidsRoute.get("/api/v1/bids/users/:id", bidsController.getByUser);
bidsRoute.get("/api/v1/bids/:id", bidsController.getById);
bidsRoute.post("/api/v1/bids", bidsController.create);
bidsRoute.put("/api/v1/bids/:id", bidsController.update);
bidsRoute.delete("/api/v1/bids/:id", bidsController.delete);

export default bidsRoute;