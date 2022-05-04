"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListModel = void 0;
const Mongoose = require("mongoose");
const DataAccess_1 = require("../DataAccess");
let mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
let mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
class ListModel {
    constructor() {
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.schema = new Mongoose.Schema({
            collectionId: String,
            ownerId: String,
            albumIds: [{ type: String }],
            name: String,
            description: String
        }, { collection: 'list' });
    }
    createModel() {
        this.model = mongooseConnection.model("list", this.schema);
    }
    retrieveAllLists(response) {
        var query = this.model.find({});
        query.exec((err, itemArray) => {
            response.json(itemArray);
        });
    }
    retrieveOneList(response, list) {
        let query = this.model.findOne(list);
        query.exec((err, itemArray) => {
            response.json(itemArray);
        });
    }
    retrieveAllAlbumsFromList(response, list) {
        let query = this.model.findOne(list, 'albumIds');
        query.exec((err, item) => {
            response.json(item);
        });
    }
    retrieveListCount(response) {
        console.log("retrieve List Count ...");
        let query = this.model.estimatedDocumentCount();
        query.exec((err, numberOfLists) => {
            console.log("numberOfLists: " + numberOfLists);
            response.json(numberOfLists);
        });
    }
    updateList(response, album) {
        console.log("Adding an album to the list");
        let query = this.model.updateOne({ name: album }, {});
    }
}
exports.ListModel = ListModel;
//# sourceMappingURL=ListModel.js.map