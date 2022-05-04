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
const SpotifyTestModel_1 = require("./model/SpotifyTestModel");
const crypto = __importStar(require("crypto"));
const ListModel_1 = require("./model/ListModel");
const UserModel_1 = require("./model/UserModel");
// Creates and configures an ExpressJS web server.
class App {
    // Spotify stuff
    // ==========================================
    /*
    public SpotifyAPIController = (function(){
  
      const clientId: string = '';
      const clientSecret: string = '';
      const getSpotifyToken = async () => {
        const result = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
  
          },
          body: 'grand_type=client_credentials'
        });
        const data = await result.json();
        return data.access_token;
      }
    })();
    */
    //Run configuration methods on the Express instance.
    constructor() {
        this.expressApp = (0, express_1.default)();
        this.middleware();
        this.routes();
        this.Albums = new SpotifyTestModel_1.SpotifyModel();
        this.List = new ListModel_1.ListModel();
        this.User = new UserModel_1.UserModel();
    }
    // Configure Express middleware.
    middleware() {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    }
    // Configure API endpoints.
    routes() {
        let router = express_1.default.Router();
        // Get all albums in the database 
        router.get('/spotify', (req, res) => {
            this.Albums.retrieveAllAlbums(res);
        });
        // Get all albums in a list
        router.get('/lists/:listName/spotify', (req, res) => {
            const name = req.params.listName;
            this.List.retrieveAllAlbumsFromList(res, { name: name });
        });
        // Get an album 
        router.get('/spotify/:albumName', (req, res) => {
            const name = req.params.albumName;
            console.log('Query single album with name: ' + name);
            this.Albums.retrieveOneAlbum(res, { name: name });
        });
        // add an album to both albums collection and list collection
        // NEEDS TO BE MODIFIED  
        router.post('/spotify/add/:listName', (req, res) => {
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
        router.get('/lists', (req, res) => {
            this.List.retrieveAllLists(res);
        });
        // GET to get one list using the name of the list 
        router.get('/lists/:listName', (req, res) => {
            let name = req.params.listName;
            console.log('Query single list with name: ' + name);
            this.List.retrieveOneList(res, { name: name });
        });
        // POST to create a list 
        router.post('/lists/create', (req, res) => {
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
        // POST to create user
        router.post('/users/createUser', (req, res) => {
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
        router.get('/users/:userName', (req, res) => {
            let userName = req.params.userName;
            console.log('Query user with name: ' + userName);
            this.User.retrieveOneUser(res, { userId: userName });
        });
        // GET all users
        router.get('/users', (req, res) => {
            console.log('Query for all users');
            this.User.retrieveAllUsers(res);
        });
        this.expressApp.use('/', router);
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map