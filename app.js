import express from 'express'
import cors from 'cors'
import session from 'express-session'
import toTypeController from './to-type/to-type-controller.js'
import userController from './users/user-controller.js'
import mongoose from "mongoose"

const app = express();

const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        autoIndex: false,
        maxPoolSize: 10,
        socketTimeoutMS: 45000,
        family: 4
}

mongoose.connect('mongodb://localhost:27017/blade-typer', options)

app.use(cors({
    credentials: true,
    origin: process.env.ORIGIN || "http://localhost:3000"
}))

app.use(session({
    secret: process.env.SECRET || "dev",
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
    },
}))

app.use(express.json())

toTypeController(app)
userController(app)

app.listen(process.env.PORT || 4000)
