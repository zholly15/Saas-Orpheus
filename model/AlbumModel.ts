import Mongoose = require("mongoose");
import {DataAccess} from '../DataAccess';
import {IAlbumModel} from '../interfaces/IAlbumModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class AlbumModel {
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
                spotifyID: String,
                _id: String,
                total_tracks: Number,
                release_date: String,
                artist_name: String,
                image_url: String,
            }, {collection: 'albums'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IAlbumModel>("albums", this.schema);
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
export {AlbumModel};