import Mongoose = require("mongoose");

class DataAccess {
    static mongooseInstance: any;
    static mongooseConnection: Mongoose.Connection;
<<<<<<< HEAD
    static DB_CONNECTION_STRING:string = 'mongodb://localhost:27017/Orpheus';
=======
    static DB_CONNECTION_STRING:string = 'mongodb://localhost:3000';
>>>>>>> 171dd7019584c2f6b96624c803e010d31049bccd
    
    constructor () {
        DataAccess.connect();
    }
    
    static connect (): Mongoose.Connection {
        if(this.mongooseInstance) return this.mongooseInstance;
        
        this.mongooseConnection  = Mongoose.connection;
        this.mongooseConnection.on("open", () => {
            console.log("Connected to mongodb.");
        });
        
        this.mongooseInstance = Mongoose.connect(this.DB_CONNECTION_STRING);
        return this.mongooseInstance;
    }
    
}
DataAccess.connect();
export {DataAccess};