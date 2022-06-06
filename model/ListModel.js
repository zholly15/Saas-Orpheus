"use strict";
exports.__esModule = true;
exports.ListModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var ListModel = /** @class */ (function () {
    function ListModel() {
        this.createSchema();
        this.createModel();
    }
    ListModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            collectionId: String,
            ownerId: String,
            albumIds: [{ type: String }],
            name: String,
            description: String
        }, { collection: 'list' });
    };
    ListModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("list", this.schema);
    };
    ListModel.prototype.retrieveAllLists = function (response) {
        var query = this.model.find({});
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    ListModel.prototype.retrieveOneList = function (response, list) {
        var query = this.model.findOne(list);
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    ListModel.prototype.retrieveAllAlbumsFromList = function (response, list) {
        var query = this.model.findOne(list, 'albumIds');
        query.exec(function (err, item) {
            response.json(item);
        });
    };
    ListModel.prototype.retrieveListCount = function (response) {
        console.log("retrieve List Count ...");
        var query = this.model.estimatedDocumentCount();
        query.exec(function (err, numberOfLists) {
            console.log("numberOfLists: " + numberOfLists);
            response.json(numberOfLists);
        });
    };
    ListModel.prototype.updateList = function (response, album) {
        console.log("Adding an album to the list");
        var query = this.model.updateOne({ name: album }, {});
    };
    ListModel.prototype.deleteOneList = function (response, name) {
        this.model.deleteOne(name).exec(function (err, name) {
            if (err)
                response.status(400);
            else
                response.status(200).json(name);
        });
    };
    return ListModel;
}());
exports.ListModel = ListModel;
