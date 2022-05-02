import Mongoose = require("mongoose");

interface ISpotifyModel extends Mongoose.Document {
    name: string;
    album: string;
    _id: string;
}
export {ISpotifyModel};