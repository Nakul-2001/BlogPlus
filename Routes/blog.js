import express from "express";
import { Blog } from "../Models/Blog.js";

const router = express.Router();

//create
router.post("/", async (req, res) => {
  try {
    const newBlog = await Blog.create({
      title: req.body.title,
      description: req.body.description,
      photo: req.body.photo,
      username: req.body.username,
      category: req.body.category,
    });

    const savedBlog = await newBlog.save();
    res.status(200).json(savedBlog);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete
router.delete("/:id", async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(
          { _id: req.params.id }
        );
        res.status(200).json(deletedBlog);
      } catch (error) {
        res.status(500).json(error);
      }
});

//update
router.put("/:id", async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get
router.get("/:id", async (req, res) => {
    try {
        const blog = await Blog.findById({_id:req.params.id});
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json(error);
    }
});

//get All
router.get("/", async (req, res) => {
    const user = req.query.user;
    const cat = req.query.cat;
    try {
        let blogs;
        if(user){
            blogs = await Blog.find({username:user});
        }
        else if(cat){
            blogs = await Blog.find({category:{$in:[cat]}});
        }
        else {
            blogs = await Blog.find();
        }
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;
