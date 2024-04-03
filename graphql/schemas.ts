const { buildSchema } = require('graphql');
import carsType from "./types/carsType";
import usersType from "./types/usersType";
import bidsType from "./types/bidsType";

const schemas = buildSchema(
    carsType,
    usersType,
    bidsType
);

export default schemas;