import CarsService from "../services/carsService";
import usersService from "../services/usersService";
import bidsService from "../services/bidsService";


const resolvers = {

    carslist: async (args) => {
        return await CarsService.get(args.page, args.perPage);
    },

    carsGetById: async (args) => {
        return await CarsService.getById(args.id);
    },

    addCars: async (args) => {
        return await CarsService.create(args.input);
    },

    deleteCars: async (args) => {
        return await CarsService.delete(args.id);
    },

    updateCars: async (args) => {
        return await CarsService.update(args.input._id, args.input);
    },

    userslist: async (args) => {
        return await usersService.get(args.page, args.perPage);
    },

    usersGetById: async (args) => {
        return await usersService.getById(args.id);
    },

    addUsers: async (args) => {
        return await usersService.create(args.input);
    },

    deleteUsers: async (args) => {
        return await usersService.delete(args.id);
    },

    updateUsers: async (args) => {
        return await usersService.update(args.input._id, args.input);
    },

    bidsListByCar: async (args) => {
        return await bidsService.getByCar(args.id);
    },

    bidsListByUser: async (args) => {
        return await bidsService.getByUser(args.id);
    },

    bidsGetById: async (args) => {
        return await bidsService.getById(args.id);
    },

    addBids: async (args) => {
        return await bidsService.create(args.input);
    },

    deleteBids: async (args) => {
        return await bidsService.delete(args.id);
    },

    updateBids: async (args) => {
        return await bidsService.update(args.input._id, args.input);
    }



};

export default resolvers;