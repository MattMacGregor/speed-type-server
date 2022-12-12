import mongoose from "mongoose"
import replaySchema from "./replay-schema.js"

const replayModel = mongoose.model('ReplayModel', replaySchema)

export default replayModel
