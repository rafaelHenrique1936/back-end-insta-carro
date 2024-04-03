import * as express from "express";
import bidsController from "../controller/bidsController";

const bidsRoute = express.Router();

bidsRoute.get("/api/v1/bids/car/:id", bidsController.getByCar);
bidsRoute.get("/api/v1/bids/car/:id/last", bidsController.getLastId);
bidsRoute.get("/api/v1/bids/user/:id", bidsController.getByUser);
bidsRoute.get("/api/v1/bids/:id", bidsController.getById);
bidsRoute.post("/api/v1/bids", bidsController.create);
bidsRoute.put("/api/v1/bids/:id", bidsController.update);
bidsRoute.delete("/api/v1/bids/:id", bidsController.delete);

export default bidsRoute;