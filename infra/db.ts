import * as mongoose from 'mongoose';

class DataBase{

    // local

    //private DB_URL = "mongodb://localhost:27017/db_insta_carro";
   
    //conteiner

     private DB_URL = "mongodb://link-db/db_insta_carro";

    createConnection(){
        mongoose.connect(this.DB_URL).then(() => console.log("conectou no banco de dados"));
        
    }
}

export default DataBase;