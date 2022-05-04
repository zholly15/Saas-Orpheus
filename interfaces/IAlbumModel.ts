import Mongoose = require("mongoose");

interface IAlbumModel extends Mongoose.Document {
    name: string;
    album: string;
    _id: string;
}
export {IAlbumModel};