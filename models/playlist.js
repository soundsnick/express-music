import mongoose from "mongoose";
import { database } from "../core/database";
import { Track } from "./track";
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        track: {
            type: Schema.Types.ObjectId,
            ref: 'Track'
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);


const Playlist = database.model('Playlist', schema);
const getPlaylistTracks = async (id) => {
    const playlist = (await Playlist.find({ owner: id })).map(track => track.track);
    return (await Track.find({ id: { $in: playlist.map(track => track.track) } }).sort({ id: -1 }));
}


export { Playlist, getPlaylistTracks };