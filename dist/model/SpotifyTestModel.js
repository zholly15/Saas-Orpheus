"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyModel = void 0;
const Mongoose = require("mongoose");
const DataAccess_1 = require("../DataAccess");
let mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
let mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
class SpotifyModel {
    constructor() {
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.schema = new Mongoose.Schema({
            name: String,
            artist: String,
            _id: String
        }, { collection: 'albums' });
    }
    createModel() {
        this.model = mongooseConnection.model("albums", this.schema);
    }
    retrieveAllLists(response) {
        var query = this.model.find({});
        query.exec((err, itemArray) => {
            response.json(itemArray);
        });
    }
    retrieveListCount(response) {
        console.log("retrieve List Count ...");
        var query = this.model.estimatedDocumentCount();
        query.exec((err, numberOfLists) => {
            console.log("numberOfLists: " + numberOfLists);
            response.json(numberOfLists);
        });
    }
}
exports.SpotifyModel = SpotifyModel;
//# sourceMappingURL=SpotifyTestModel.js.map