import { IntegerType, NumericType } from "mongodb";
import Mongoose = require("mongoose");

interface IUserModel extends Mongoose.Document {
    email: String;
    UserId: Number;
    username: String;
    password: String;
    fName: String;
    lName: String;
    isActive: Boolean;
}

export {IUserModel};