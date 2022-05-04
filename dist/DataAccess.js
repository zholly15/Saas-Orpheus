"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataAccess = void 0;
const Mongoose = require("mongoose");
class DataAccess {
    constructor() {
        DataAccess.connect();
    }
    static connect() {
        if (this.mongooseInstance)
            return this.mongooseInstance;
        this.mongooseConnection = Mongoose.connection;
        this.mongooseConnection.on("open", () => {
            console.log("Connected to mongodb.");
        });
        this.mongooseInstance = Mongoose.connect(this.DB_CONNECTION_STRING);
        return this.mongooseInstance;
    }
}
exports.DataAccess = DataAccess;
<<<<<<< HEAD
DataAccess.DB_CONNECTION_STRING = 'mongodb://localhost:27017/Orpheus';
=======
DataAccess.DB_CONNECTION_STRING = 'mongodb://localhost:3000';
>>>>>>> 171dd7019584c2f6b96624c803e010d31049bccd
DataAccess.connect();
//# sourceMappingURL=DataAccess.js.map