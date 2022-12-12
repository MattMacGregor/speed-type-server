import mongoose from "mongoose"
import replaySchema from "../replays/replay-schema.js"

// Users have one-to-many relationship with replays
// Many-to-many relationship needs to be figured out
const usersSchema = mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    email: String,
    firstName: String,
    lastName: String,
}, {collection: 'users'})

export default usersSchema

