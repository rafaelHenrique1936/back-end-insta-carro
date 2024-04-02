import * as express from "express";
import bidsController from "../controller/bidsController";

const bidsRoute = express.Router();

bidsRoute.route("/api/v1/bids/car/:id").get(bidsController.getByCar);
bidsRoute.route("/api/v1/bids/car/:id/last").get(bidsController.getLastId);
bidsRoute.route("/api/v1/bids/user/:id").get(bidsController.getByUser);
bidsRoute.route("/api/v1/bids/:id").get(bidsController.getById);
bidsRoute.route("/api/v1/bids").post(bidsController.create);
bidsRoute.route("/api/v1/bids/:id").put(bidsController.update);
bidsRoute.route("/api/v1/bids/:id").delete(bidsController.delete);

export default bidsRoute;