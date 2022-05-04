import Mongoose = require("mongoose");
import {DataAccess} from '../DataAccess';
import {ISpotifyModel} from '../interfaces/ISpotifyModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class SpotifyModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                name: String,
                artist: String,
                _id: String,
                spotifyId: String
            }, {collection: 'albums'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<ISpotifyModel>("albums", this.schema);
    }

    public retrieveAllAlbums(response:any): any {
        let query = this.model.find({});
        query.exec( (err, itemArray) => {
            response.json(itemArray) ;
        });
    }

    public retrieveOneAlbum(response:any, album:Object): any{
        let query = this.model.findOne(album);
        query.exec((err, item) => {
            response.json(item);
        });
    }

    public retrieveAlbumCount(response:any): any {
        console.log("retrieve List Count ...");
        var query = this.model.estimatedDocumentCount();
        query.exec( (err, numberOfLists) => {
            console.log("numberOfLists: " + numberOfLists);
            response.json(numberOfLists) ;
        });
    }

}
export {SpotifyModel};