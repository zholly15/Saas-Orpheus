import Mongoose = require("mongoose");
import {DataAccess} from '../DataAccess';
import {IListModel} from '../interfaces/IListModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class ListModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                collectionId: String,
                ownerId: String,
                albumIds: [{type: String}],
                name: String,
                description: String
            }, {collection: 'list'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IListModel>("list", this.schema);
    }

    public retrieveAllLists(response:any): any {
        var query = this.model.find({});
        query.exec( (err, itemArray) => {
            response.json(itemArray);
        });
    }

    public retrieveOneList(response:any, list:Object): any {
        let query = this.model.findOne(list);
        query.exec((err, itemArray) => {
            response.json(itemArray);
        });
    }

    public retrieveAllAlbumsFromList(response:any, list:Object): any { 
        let query = this.model.findOne(list, 'albumIds');
        query.exec((err, item) => {
            response.json(item);
        });
    }

    public retrieveListCount(response:any): any {
        console.log("retrieve List Count ...");
        let query = this.model.estimatedDocumentCount();
        query.exec( (err, numberOfLists) => {
            console.log("numberOfLists: " + numberOfLists);
            response.json(numberOfLists) ;
        });
    }

    public updateList(response:any, album:Object): any {
        console.log("Adding an album to the list");
        let query = this.model.updateOne({name: album}, {})
    }

    public deleteOneList(response:any, collection:String) : any {
        this.model.find({collectionId:collection}).remove().exec( (err, item) => {
            response.json(item);
        });
    }

}
export {ListModel};

