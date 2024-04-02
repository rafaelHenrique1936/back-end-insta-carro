export default

    `
scalar Date 

type Query{
    bidslist:[Bids]
    bidsGetById(id: String): Bids
}

type Mutation{

    addBids(input: bidsInput): Bids
    updateBids(id: String, input: bidsInput): Bids
    deleteBids(id: String): Bids
}



type bids{
    _id: String,
    user: String,
    car: String,
    amount: Float
    timestamp: Date
}

input bidsInput{
    _id: String,
    user: String,
    car: String,
    amount: Float
    timestamp: Date
}

`