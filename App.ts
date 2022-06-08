import express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as mongodb from 'mongodb';
import * as url from 'url';
import * as bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import {AlbumModel} from './model/AlbumModel';
import * as crypto from 'crypto';
import { ListModel } from './model/ListModel';
import { UserModel } from './model/UserModel';
import * as cors from 'cors';

import GooglePassportObj from './GooglePassport';
import passport from 'passport';



const options: cors.CorsOptions = {
  origin: '*'
};

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public expressApp: express.Application;
  public Albums:AlbumModel;
  public List:ListModel;
  public User:UserModel;
  public idGenerator:number;
  public googlePassportObj:GooglePassportObj;



  //Run configuration methods on the Express instance.
  constructor() {
    this.googlePassportObj = new GooglePassportObj();
    this.idGenerator = 102;
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.Albums = new AlbumModel();
    this.List = new ListModel();
    this.User = new UserModel();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    this.expressApp.use(session({ secret: 'keyboard cat' }));
    this.expressApp.use(cookieParser());
    this.expressApp.use(passport.initialize());
    this.expressApp.use(passport.session());
  }

  private validateAuth(req, res, next):void {
    if (req.isAuthenticated()) { console.log("user is authenticated"); return next(); }
    console.log("user is not authenticated");
    res.redirect('/failure');
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();

    router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

    router.get('/auth/google/callback',
    passport.authenticate(
        'google',
        { failureRedirect: '/failure' }
    ),
    (req, res) => {
        console.log("successfully authenticated user and returned to callback page.");
        console.log("redirecting");
        let result = res;
        let userid = result['req']['user']!['id'];
        console.log("user accesstoken" + req.user);
        //console.log('http://localhost:8080/app/user/' + userid);
        res.redirect("/index.html");

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

  router.get("/failure", (req,res) => {
    res.send("You are not authenticated!")

  })

  router.delete('/app/user', this.validateAuth, (req, res) => {
      console.log(req.body)
      let userId = req.body.userId;
      this.User.deleteUser(res, { userId: { $eq: userId } })
  });

  router.put('/app/user', this.validateAuth,  (req, res) => {
      console.log('Updating user according to following request: ' + req.body)
      console.log(req.body)
      this.User.updateUser(res, req.body.userId, req.body.document)
  });

    // Get all albums in the database 
    router.get('/albums',this.validateAuth, (req, res) => {
      this.Albums.retrieveAllAlbums(res);
    });

    // Get all albums in a list
    router.get('/lists/:listName/albums',this.validateAuth, (req, res) => {
      const name = req.params.listName;
      this.List.retrieveAllAlbumsFromList(res, {name: name});
    });

    // Get an album 
    router.get('/albums/search/:albumID',this.validateAuth, (req, res) => {
      const spotifyID = req.params.albumID;
      console.log('Query single album with spotifyID: ' + spotifyID);
      this.Albums.retrieveOneAlbum(res, {spotifyID: spotifyID});
    });

    // Get an album 
    router.get('/albums/search/name/:albumName',this.validateAuth, (req, res) => {
      const name= req.params.albumName;
      console.log('Query single album with Album name: ' + name);
      this.Albums.retrieveOneAlbum(res, {name: name});
    });

    // add an album to both albums collection and list collection
    // TODO: Make albumID or name past through body to then be queried to spotify
    router.post('/album/add/:listName',this.validateAuth, (req, res) =>{
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
    router.get('/lists',this.validateAuth, (req, res) => {
      this.List.retrieveAllLists(res);
    })

    // GET to get one list using the name of the list 
    router.get('/lists/search/:collectionID',this.validateAuth, (req, res) => {
      let collectionID = req.params.collectionID;
      console.log('Query single list with ID: ' + collectionID);
      this.List.retrieveOneList(res, {collectionId: collectionID});
    });

    // POST to create a list 
    router.post('/lists/create',this.validateAuth, (req, res) => {
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
    router.post('/users/createUser',this.validateAuth, (req, res) => {
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
    router.get('/users/search/:userId',this.validateAuth, (req, res) => {
      let userId = req.params.userId;
      console.log('Query user with Id: ' + userId);
      this.User.retrieveOneUser(res, {userId: userId});
    });

    // GET all users
    router.get('/users',this.validateAuth, (req, res) => {
      console.log('Query for all users');
      this.User.retrieveAllUsers(res);
    })

    router.get('/', (req,res)=>{
      res.redirect("/auth/google")
    })

  

    this.expressApp.use('/', router);
    this.expressApp.use(this.validateAuth);
    this.expressApp.use('/', express.static(__dirname+'/angularDist'));
  }


}

export {App};