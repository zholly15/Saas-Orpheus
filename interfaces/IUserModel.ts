import { IntegerType } from "mongodb";
import Mongoose = require("mongoose");

interface IUserModel extends Mongoose.Document {
    email: String;
    username: String;
    password: String;
    fName: String;
    lName: String;
}

export {IUserModel};