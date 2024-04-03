import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from 'multer'
import path from "path";
import { dirname } from 'path';

import userRoute from "./Routes/user.js"
import blogRoute from "./Routes/blog.js"
import authRoute from "./Routes/auth.js"
import categoryRoute from './Routes/category.js'
import uploadRoute from './Routes/uploadRoute.js'

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname,'public')));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Db Connected Succesfully"))
  .catch(() => console.log("Error in connecting Db"));


const upload = multer({
  storage:multer.diskStorage({}),
});


app.use('/api/auth',authRoute);
app.use('/api/user',userRoute);
app.use('/api/blog',blogRoute);
app.use('/api/category',categoryRoute);
app.use('/api/upload',upload.single('file'),uploadRoute);

app.listen(process.env.PORT, () => {
  console.log(`app is working at port 3000`);
});
