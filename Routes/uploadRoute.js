import express from "express";
import upload from '../Utils/upload.js'

const router = express.Router();

router.post('/', async (req,res)=>{
    try{
        console.log(req.file.path);
        const result = await upload(req.file.path);
        res.json(result);
    }
    catch(err){
        console.log(err);
    }
})



export default router;
