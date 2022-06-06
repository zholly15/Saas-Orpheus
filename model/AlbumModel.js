"use strict";
exports.__esModule = true;
exports.AlbumModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var AlbumModel = /** @class */ (function () {
    function AlbumModel() {
        this.createSchema();
        this.createModel();
    }
    AlbumModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            name: String,
            spotifyID: String,
            _id: String,
            total_tracks: Number,
            release_date: String,
            artist_name: String,
            image_url: String
        }, { collection: 'albums' });
    };
    AlbumModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("albums", this.schema);
    };
    AlbumModel.prototype.retrieveAllAlbums = function (response) {
        var query = this.model.find({});
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    AlbumModel.prototype.retrieveOneAlbum = function (response, album) {
        var query = this.model.findOne(album);
        query.exec(function (err, item) {
            response.json(item);
        });
    };
    AlbumModel.prototype.retrieveAlbumCount = function (response) {
        console.log("retrieve List Count ...");
        var query = this.model.estimatedDocumentCount();
        query.exec(function (err, numberOfLists) {
            console.log("numberOfLists: " + numberOfLists);
            response.json(numberOfLists);
        });
    };
    return AlbumModel;
}());
exports.AlbumModel = AlbumModel;
