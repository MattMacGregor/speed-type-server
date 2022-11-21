import express from 'express'
import cors from 'cors'
import toTypeController from './controllers/toType/toTypeController.js'
const app = express();
app.use(cors());
app.use(express.json());
toTypeController(app);
app.listen(process.env.PORT || 4000);
