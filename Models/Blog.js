import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type:String,
        requiredd:true,
    },
    photo:{
        type:String,
        required:false,
    },
    username:{
        type:String,
        required:true,
    },
    category:{
        type:Array,
        required:false,
    }
}, { timestamps: true });

export const Blog = mongoose.model('Blog',blogSchema);