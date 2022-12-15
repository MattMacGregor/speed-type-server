import mongoose from "mongoose"

const pageSchema = mongoose.Schema({
    title: String,
    description: String,
    summary: String,
    typeContent: [String],
}, {collection: "pages"})

export default pageSchema
