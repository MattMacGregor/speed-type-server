import mongoose from "mongoose"
import usersSchema from "./user-schema.js"

const usersModel = mongoose.model('UserModel', usersSchema)

export default usersModel
