import Mongoose = require("mongoose");

interface IAlbumModel extends Mongoose.Document {
    name: string;
    spotifyID: string;
    _id: string;
    total_tracks: number;
    release_date: string;
    artist_name: string;
    
}
export {IAlbumModel};