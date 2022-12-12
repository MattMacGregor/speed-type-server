import mongoose from "mongoose"

const replaySchema = mongoose.Schema({
    gamemode: {type: String, enum: ['SEARCH', 'DAY', 'RANDOM'], required: true},
    username: {type: String, required: true},
    typingId: {type: String, required: true},
    wpm: Number,
    accuracy: Number,
    time: Number,
    date: Date
}, { collection: "replays" })

export default replaySchema
