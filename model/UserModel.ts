import Mongoose = require("mongoose");
import { stringify } from "querystring";
import {DataAccess} from '../DataAccess';
import {IUserModel} from '../interfaces/IUserModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class UserModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                email: String,
                userId: String,
                username: String,
                password: String,
                fName: String,
                lName: String,
            }, {collection: 'users'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IUserModel>("users", this.schema);
    }

    public retrieveAllUsers(response:any): any {
        var query = this.model.find({});
        query.exec((err, itemArray) => {
            response.json(itemArray);
        });
    }

    public retrieveOneUser(response:any, name:Object): any {
        let query = this.model.findOne(name);
        query.exec((err, itemArray) => {
            response.json(itemArray);
        });
    }

    public deleteOneUser(response:any, name:Object) : any {
        this.model.findOne(name).remove().exec((err, name) => {
            if (err)
                response.status(400).json(name);
            else
                response.status(200).json(name);
        });
    }


}
export {UserModel};

