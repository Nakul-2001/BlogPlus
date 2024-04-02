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

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
const __dirname = path.resolve();
app.use('/images',express.static(path.join(__dirname,'/images')));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Db Connected Succesfully"))
  .catch(() => console.log("Error in connecting Db"));


const storage = multer.diskStorage({
  destination:(req,file,cb) => {
    cb(null,"Images");
  },
  filename:(req,file,cb) => {
    cb(null,req.body.name);
  },
});

const upload = multer({storage:storage});
app.post('/api/upload',upload.single('file'),(req,res)=>{
  res.status(200).json("File has been uploaded");
});


app.use('/api/auth',authRoute);
app.use('/api/user',userRoute);
app.use('/api/blog',blogRoute);
app.use('/api/category',categoryRoute);

app.listen(process.env.PORT, () => {
  console.log(`app is working at port 3000`);
});
