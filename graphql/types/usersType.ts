export default

    `
scalar Date 

type Query{
    userslist:[Users]
    usersGetById(id: String): Users
}

type Mutation{

    addUsers(input: UsersInput): Users
    updateUsers(id: String, input: UsersInput): Users
    deleteUsers(id: String): Users
}



type Users{
    _id: String,
    name: String,
    email: String,
    password: String,
    phoneNumber: String ,
    active: Boolean
}

input UsersInput{
    _id: String,
    name: String,
    email: String,
    password: String,
    phoneNumber: String ,
    active: Boolean
}

`