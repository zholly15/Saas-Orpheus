import express from 'express';
import * as bodyParser from 'body-parser';
import {SpotifyModel} from './model/SpotifyTestModel';
import * as crypto from 'crypto';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public expressApp: express.Application;
  public Albums:SpotifyModel;

  //Run configuration methods on the Express instance.
  constructor() {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.Albums = new SpotifyModel();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();

    router.get('/', (req, res)=>{
      this.Albums.retrieveAllLists(res);
    })


    this.expressApp.use('/', router);

   
  }

}

export {App};