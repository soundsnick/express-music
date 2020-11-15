import mongoose from "mongoose";
import { database } from "../core/database";
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        body: {
            type: String
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


export const Post = database.model('Post', schema);