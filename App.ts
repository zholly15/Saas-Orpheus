import express from 'express';
import * as bodyParser from 'body-parser';
import {SpotifyModel} from './model/SpotifyTestModel';
import * as crypto from 'crypto';
import { ListModel } from './model/ListModel';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public expressApp: express.Application;
  public Albums:SpotifyModel;
  public List:ListModel;

  //Run configuration methods on the Express instance.
  constructor() {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.Albums = new SpotifyModel();
    this.List = new ListModel();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();

    router.get('/spotify', (req, res)=>{
      this.Albums.retrieveAllLists(res);
    })

    router.get('/lists', (req, res) => {
      this.List.retrieveAllLists(res);
    })


    this.expressApp.use('/', router);

   
  }

}

export {App};