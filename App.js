"use strict";
exports.__esModule = true;
exports.App = void 0;
var express_1 = require("express");
var bodyParser = require("body-parser");
var AlbumModel_1 = require("./model/AlbumModel");
var crypto = require("crypto");
var ListModel_1 = require("./model/ListModel");
var UserModel_1 = require("./model/UserModel");
var cors = require('cors');
// Creates and configures an ExpressJS web server.
var App = /** @class */ (function () {
    //Run configuration methods on the Express instance.
    function App() {
        this.expressApp = (0, express_1["default"])();
        this.middleware();
        this.routes();
        this.Albums = new AlbumModel_1.AlbumModel();
        this.List = new ListModel_1.ListModel();
        this.User = new UserModel_1.UserModel();
    }
    // Configure Express middleware.
    App.prototype.middleware = function () {
        this.expressApp.use(cors());
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    };
    // Configure API endpoints.
    App.prototype.routes = function () {
        var _this = this;
        var router = express_1["default"].Router();
        // Get all albums in the database 
        router.get('/albums', function (req, res) {
            _this.Albums.retrieveAllAlbums(res);
        });
        // Get all albums in a list
        router.get('/lists/:listName/albums', function (req, res) {
            var name = req.params.listName;
            _this.List.retrieveAllAlbumsFromList(res, { name: name });
        });
        // Get an album 
        router.get('/albums/search/:albumID', function (req, res) {
            var spotifyID = req.params.albumID;
            console.log('Query single album with spotifyID: ' + spotifyID);
            _this.Albums.retrieveOneAlbum(res, { spotifyID: spotifyID });
        });
        // Get an album 
        router.get('/albums/search/name/:albumName', function (req, res) {
            var name = req.params.albumName;
            console.log('Query single album with Album name: ' + name);
            _this.Albums.retrieveOneAlbum(res, { name: name });
        });
        // add an album to both albums collection and list collection
        // TODO: Make albumID or name past through body to then be queried to spotify
        router.post('/album/add/:listName', function (req, res) {
            var id = crypto.randomBytes(16).toString("hex");
            var name = req.params.listName;
            console.log("Adding an album to list: " + name);
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj._id = id;
            _this.List.model.updateOne({ name: name }, {
                "$push": { albumIds: jsonObj }
            }, function () {
                console.log('Update made to list...');
            });
            var doc = new _this.Albums.model(jsonObj);
            doc.save(function (err) {
                if (err) {
                    console.log('object creation failed');
                    res.status(400);
                }
            });
            res.send(jsonObj);
        });
        // GET to get all lists 
        router.get('/lists', function (req, res) {
            _this.List.retrieveAllLists(res);
        });
        // GET to get one list using the name of the list 
        router.get('/lists/search/:collectionID', function (req, res) {
            var collectionID = req.params.collectionID;
            console.log('Query single list with ID: ' + collectionID);
            _this.List.retrieveOneList(res, { collectionId: collectionID });
        });
        // POST to create a list 
        router.post('/lists/create', function (req, res) {
            var id = crypto.randomBytes(16).toString("hex");
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj.collectionId = id;
            jsonObj.albumIds = [];
            var doc = new _this.List.model(jsonObj);
            doc.save(function (err) {
                if (err) {
                    console.log("Object creation failed");
                    res.status(400);
                }
            });
            res.status(200).json(jsonObj);
        });
        router["delete"]('/lists/delete/:collectionId', function (req, res) {
            _this.List.deleteOneList(res, req.params.collectionId);
        });
        // POST to create user
        router.post('/users/createUser', function (req, res) {
            var id = crypto.randomBytes(16).toString("hex");
            console.log(req.body);
            var jsonObj = req.body;
            var doc = new _this.User.model(jsonObj);
            doc.save(function (err) {
                if (err) {
                    console.log("User creation failed");
                    res.status(400);
                }
            });
            res.status(200).json(jsonObj);
        });
        // GET a username
        router.get('/users/search/:userId', function (req, res) {
            var userId = req.params.userId;
            console.log('Query user with Id: ' + userId);
            _this.User.retrieveOneUser(res, { userId: userId });
        });
        // GET all users
        router.get('/users', function (req, res) {
            console.log('Query for all users');
            _this.User.retrieveAllUsers(res);
        });
        router.get('/', function (req, res) {
            res.send("Welcome to the Orpheus API");
        });
        this.expressApp.use('/', router);
    };
    return App;
}());
exports.App = App;
