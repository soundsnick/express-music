import mongoose from "mongoose";

const database = mongoose.createConnection('mongodb://localhost/crossroad', { useNewUrlParser: true });

export { database };