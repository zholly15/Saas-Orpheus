import { IntegerType } from "mongodb";
import Mongoose = require("mongoose");

interface IListModel extends Mongoose.Document {
    collectionId: String;
    ownerId: String;
    albumIds: [{type: String}];
    name: String;
    description: String;
}
export {IListModel};