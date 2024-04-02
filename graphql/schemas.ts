const { buildSchema } = require('graphql');
import carsType from "./types/carsType";
import usersType from "./types/usersType";

const schemas = buildSchema(
    carsType,
    usersType
);

export default schemas;