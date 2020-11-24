import mongoose from "mongoose";
import { database } from "../core/database";
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

export { Playlist };