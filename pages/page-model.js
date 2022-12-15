import mongoose from "mongoose"
import pageSchema from "./page-schema.js"

const pageModel = mongoose.model('PageModel', pageSchema)

export default pageModel
