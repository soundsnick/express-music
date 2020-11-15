import mongoose from "mongoose";
import { database } from "../core/database";
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const User = database.model('User', schema);