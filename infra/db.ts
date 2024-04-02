import * as mongoose from 'mongoose';

class DataBase{
    //private DB_URL = "mongodb://localhost:27017/db_insta_carro";
    private DB_URL = "mongodb://link-db/db_insta_carro";

    createConnection(){
        mongoose.connect(this.DB_URL).then(() => console.log("conectou no banco de dados"));
        
    }
}

export default DataBase;