import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import * as compression from 'compression';
import { graphqlHTTP } from 'express-graphql';


import DataBase from "./infra/db";
import Auth from "./infra/auth";
import carsRoute from "./router/carsRouter";
import usersRoute from "./router/usersRoute";
import bidsRoute from "./router/bidsRoute";


import schemas from "./graphql/schemas";
import resolvers from "./graphql/resolvers";



class StartUp {
    public app: express.Application;
    private _db: DataBase;
    private bodyParser;

    constructor() {
        this.app = express();
        this._db = new DataBase();
        this._db.createConnection();
        this.middler();
        this.routes();
    }

    enableCors() {
        const options: cors.CorsOptions = {
            methods: "GET,OPTIONS,PUT,POST,DELETE",
            origin: "*"
        }
    }

    middler() {
        this.enableCors();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(compression());
    }

    routes() {
        this.app.route('/').get((req, res) => {
            res.send({ versao: '0.0.1' })
        })

        this.app.use('/graphql', graphqlHTTP({
            schema: schemas,
            rootValue: resolvers,
            graphiql: true
        }))

        this.app.use(Auth.validate);

        this.app.use('/', carsRoute);
        this.app.use('/', usersRoute);
        this.app.use('/', bidsRoute);


    }


}

export default new StartUp();