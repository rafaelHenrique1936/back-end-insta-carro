export default

    `
scalar Date 

type Query{
    carslist:[Cars]
    carsGetById(id: String): Cars
}

type Mutation{

    addCars(input: CarsInput): Cars
    updateCars(id: String, input: CarsInput): Cars
    deleteCars(id: String): Cars
}



type Cars{
    _id: String,
    brand: String,
    models: String,
    year: Int,
    mileage: Int, 
    price: Float, 
    minimumPrice: Float, 
    transmission: String, 
    fuelType: String, 
    engineSize: Int, 
    numOfSeats: Int, 
    numOfDoors: Int, 
    color: String,
    condition: String, 
    features: String,
    auctionEndDate: Date, 
}

input CarsInput{
    _id: String,
    brand: String,
    models: String,
    year: Int,
    mileage: Int, 
    price: Float, 
    minimumPrice: Float, 
    transmission: String, 
    fuelType: String, 
    engineSize: Int, 
    numOfSeats: Int, 
    numOfDoors: Int, 
    color: String,
    condition: String, 
    features: String,
    auctionEndDate: Date, 
}

`