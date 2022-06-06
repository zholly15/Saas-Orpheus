"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const AlbumModel_1 = require("./model/AlbumModel");
const crypto = __importStar(require("crypto"));
const ListModel_1 = require("./model/ListModel");
const UserModel_1 = require("./model/UserModel");
let cors = require('cors');
const GooglePassport_1 = __importDefault(require("./GooglePassport"));
const passport_1 = __importDefault(require("passport"));
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.googlePassportObj = new GooglePassport_1.default();
        this.idGenerator = 102;
        this.expressApp = (0, express_1.default)();
        this.middleware();
        this.routes();
        this.Albums = new AlbumModel_1.AlbumModel();
        this.List = new ListModel_1.ListModel();
        this.User = new UserModel_1.UserModel();
    }
    // Configure Express middleware.
    middleware() {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use((0, express_session_1.default)({ secret: 'keyboard cat' }));
        this.expressApp.use((0, cookie_parser_1.default)());
        this.expressApp.use(passport_1.default.initialize());
        this.expressApp.use(passport_1.default.session());
    }
    validateAuth(req, res, next) {
        if (req.isAuthenticated()) {
            console.log("user is authenticated");
            return next();
        }
        console.log("user is not authenticated");
        res.redirect('/');
    }
    // Configure API endpoints.
    routes() {
        let router = express_1.default.Router();
        router.get('/auth/google', passport_1.default.authenticate('google', { scope: ['profile'] }));
        router.get('/auth/google/callback', passport_1.default.authenticate('google', { failureRedirect: 'http://localhost:4200' }), (req, res) => {
            console.log("successfully authenticated user and returned to callback page.");
            console.log("redirecting");
            let result = res.json();
            let userid = result['req']['user']['id'];
            console.log('http://localhost:8080/app/user/' + userid);
            res.redirect('/');
        });
        router.post('/app/user/', this.validateAuth, (req, res) => {
            console.log(req.body);
            let jsonObj = req.body;
            this.User.model.create([jsonObj], (err) => {
                if (err) {
                    console.log('User object creation failed');
                }
            });
            res.send(this.idGenerator.toString());
            this.idGenerator++;
        });
        router.delete('/app/user', this.validateAuth, (req, res) => {
            console.log(req.body);
            let userId = req.body.userId;
            this.User.deleteUser(res, { userId: { $eq: userId } });
        });
        router.put('/app/user', this.validateAuth, (req, res) => {
            console.log('Updating user according to following request: ' + req.body);
            console.log(req.body);
            this.User.updateUser(res, req.body.userId, req.body.document);
        });
        // Get all albums in the database 
        router.get('/albums', this.validateAuth, (req, res) => {
            this.Albums.retrieveAllAlbums(res);
        });
        // Get all albums in a list
        router.get('/lists/:listName/albums', this.validateAuth, (req, res) => {
            const name = req.params.listName;
            this.List.retrieveAllAlbumsFromList(res, { name: name });
        });
        // Get an album 
        router.get('/albums/search/:albumID', this.validateAuth, (req, res) => {
            const spotifyID = req.params.albumID;
            console.log('Query single album with spotifyID: ' + spotifyID);
            this.Albums.retrieveOneAlbum(res, { spotifyID: spotifyID });
        });
        // Get an album 
        router.get('/albums/search/name/:albumName', this.validateAuth, (req, res) => {
            const name = req.params.albumName;
            console.log('Query single album with Album name: ' + name);
            this.Albums.retrieveOneAlbum(res, { name: name });
        });
        // add an album to both albums collection and list collection
        // TODO: Make albumID or name past through body to then be queried to spotify
        router.post('/album/add/:listName', this.validateAuth, (req, res) => {
            const id = crypto.randomBytes(16).toString("hex");
            const name = req.params.listName;
            console.log("Adding an album to list: " + name);
            console.log(req.body);
            let jsonObj = req.body;
            jsonObj._id = id;
            this.List.model.updateOne({ name: name }, {
                "$push": { albumIds: jsonObj }
            }, function () {
                console.log('Update made to list...');
            });
            let doc = new this.Albums.model(jsonObj);
            doc.save((err) => {
                if (err) {
                    console.log('object creation failed');
                    res.status(400);
                }
            });
            res.send(jsonObj);
        });
        // GET to get all lists 
        router.get('/lists', this.validateAuth, (req, res) => {
            this.List.retrieveAllLists(res);
        });
        // GET to get one list using the name of the list 
        router.get('/lists/search/:collectionID', this.validateAuth, (req, res) => {
            let collectionID = req.params.collectionID;
            console.log('Query single list with ID: ' + collectionID);
            this.List.retrieveOneList(res, { collectionId: collectionID });
        });
        // POST to create a list 
        router.post('/lists/create', this.validateAuth, (req, res) => {
            const id = crypto.randomBytes(16).toString("hex");
            console.log(req.body);
            const jsonObj = req.body;
            jsonObj.collectionId = id;
            jsonObj.albumIds = [];
            const doc = new this.List.model(jsonObj);
            doc.save((err) => {
                if (err) {
                    console.log("Object creation failed");
                    res.status(400);
                }
            });
            res.status(200).json(jsonObj);
        });
        router.delete('/lists/delete/:collectionId', (req, res) => {
            this.List.deleteOneList(res, req.params.collectionId);
        });
        // POST to create user
        router.post('/users/createUser', this.validateAuth, (req, res) => {
            const id = crypto.randomBytes(16).toString("hex");
            console.log(req.body);
            const jsonObj = req.body;
            const doc = new this.User.model(jsonObj);
            doc.save((err) => {
                if (err) {
                    console.log("User creation failed");
                    res.status(400);
                }
            });
            res.status(200).json(jsonObj);
        });
        // GET a username
        router.get('/users/search/:userId', this.validateAuth, (req, res) => {
            let userId = req.params.userId;
            console.log('Query user with Id: ' + userId);
            this.User.retrieveOneUser(res, { userId: userId });
        });
        // GET all users
        router.get('/users', this.validateAuth, (req, res) => {
            console.log('Query for all users');
            this.User.retrieveAllUsers(res);
        });
        router.get('/', (req, res) => {
            res.send("Welcome to the Orpheus API");
        });
        this.expressApp.use('/', router);
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map