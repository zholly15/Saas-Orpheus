import express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as mongodb from 'mongodb';
import * as url from 'url';
import * as bodyParser from 'body-parser';
import session from 'express-session';
import {AlbumModel} from './model/AlbumModel';
import * as crypto from 'crypto';
import { ListModel } from './model/ListModel';
import { UserModel } from './model/UserModel';
let  cors = require('cors');


// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public expressApp: express.Application;
  public Albums:AlbumModel;
  public List:ListModel;
  public User:UserModel;


  //Run configuration methods on the Express instance.
  constructor() {

    this.expressApp = express();
    this.middleware();
    this.routes();
    this.Albums = new AlbumModel();
    this.List = new ListModel();
    this.User = new UserModel();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(cors());
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
  }


  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();


    // Get all albums in the database 
    router.get('/albums', (req, res) => {
      this.Albums.retrieveAllAlbums(res);
    });

    // Get all albums in a list
    router.get('/lists/:listName/albums', (req, res) => {
      const name = req.params.listName;
      this.List.retrieveAllAlbumsFromList(res, {name: name});
    });

    // Get an album 
    router.get('/albums/search/:albumID', (req, res) => {
      const spotifyID = req.params.albumID;
      console.log('Query single album with spotifyID: ' + spotifyID);
      this.Albums.retrieveOneAlbum(res, {spotifyID: spotifyID});
    });

    // Get an album 
    router.get('/albums/search/name/:albumName', (req, res) => {
      const name= req.params.albumName;
      console.log('Query single album with Album name: ' + name);
      this.Albums.retrieveOneAlbum(res, {name: name});
    });

    // add an album to both albums collection and list collection
    // TODO: Make albumID or name past through body to then be queried to spotify
    router.post('/album/add/:listName', (req, res) =>{
      const id = crypto.randomBytes(16).toString("hex");
      const name = req.params.listName;
      console.log("Adding an album to list: " + name); 
      console.log(req.body);
      let jsonObj = req.body;
      jsonObj._id = id;
      this.List.model.updateOne({name: name}, { 
          "$push": { albumIds: jsonObj } 
      }, function(){
        console.log('Update made to list...');
      });
      let doc = new this.Albums.model(jsonObj);
      doc.save((err) => {
          if(err) {
          console.log('object creation failed');
          res.status(400);
        }
      });
      res.send(jsonObj);
    })

    // GET to get all lists 
    router.get('/lists', (req, res) => {
      this.List.retrieveAllLists(res);
    })

    // GET to get one list using the name of the list 
    router.get('/lists/search/:collectionID', (req, res) => {
      let collectionID = req.params.collectionID;
      console.log('Query single list with ID: ' + collectionID);
      this.List.retrieveOneList(res, {collectionId: collectionID});
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
          if(err) {console.log("Object creation failed");
          res.status(400);
      }
      });
      res.status(200).json(jsonObj);
    });

    router.delete('/lists/delete/:collectionId', (req,res) => {
      this.List.deleteOneList(res, req.params.collectionId);
    })

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

    })
    
    // GET a username
    router.get('/users/search/:userId', (req, res) => {
      let userId = req.params.userId;
      console.log('Query user with Id: ' + userId);
      this.User.retrieveOneUser(res, {userId: userId});
    });

    // GET all users
    router.get('/users', (req, res) => {
      console.log('Query for all users');
      this.User.retrieveAllUsers(res);
    })

    router.get('/', (req,res)=>{
      res.send("Welcome to the Orpheus API");
    })

    this.expressApp.use('/', router);
  }

}

export {App};