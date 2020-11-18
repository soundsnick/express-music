import mongoose from "mongoose";
import { database } from "../core/database";
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        cover: {
            type: String
        },
        track: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        artist: {
            type: String,
            required: true
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


const Track = database.model('Track', schema);
const getLastTracks = () => {
    let trackList = [];
    Track
        .find({})
        .limit(5)
        .sort({id: -1})
        .then(tracks => { trackList = tracks });
    return trackList;
}

export { getLastTracks, Track };