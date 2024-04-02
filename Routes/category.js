import express from "express";
import {Category} from '../Models/Category.js'

const router = express.Router();

//create
router.post('/',async (req,res)=>{
    try{
        const newCat = await Category.create(req.body);
        const savedCat = await newCat.save();
        res.status(200).json(savedCat);
    }
    catch(err){
        res.status(500).json(err);
    }
})


//get
router.get('/',async (req,res)=>{
    try{
        const Categories = await Category.find();
        res.status(200).json(Categories);
    }
    catch(err){
        res.status(500).json(err);
    }
})

export default router;