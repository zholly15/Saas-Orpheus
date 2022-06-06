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
                userId: Number,
                email: String,
                username: String,
                password: String,
                fName: String,
                lName: String,
                isActive: Boolean
            }, {collection: 'users'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IUserModel>("users", this.schema);
    }

    public deleteUser(response: any, filter: Object): any{
        let query = this.model.deleteOne(filter)
        query.exec((err, userResult) => {
            response.json(userResult)
        })
    }

    public updateUser(response:any, filter: Object, document:Object):any{
        let query = this.model.find({isActive: true});
        query.exec((err, itemArray)=> {
            response.json(itemArray)
        })
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
          response.json(name);
        });
    }


}
export {UserModel};

