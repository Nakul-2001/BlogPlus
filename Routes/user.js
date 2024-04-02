import express from "express";
import { User } from "../Models/User.js";
import { Blog } from "../Models/Blog.js";
import CryptoJS from "crypto-js";

const router = express.Router();

//Update.
router.put("/:id", async (req, res) => {
  try {
    let password;
    if (req.body.password) {
      password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SEC
      ).toString();
      req.body.password = password;
    }

    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json(error);
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete({ _id: req.params.id });
    const blogs = await Blog.deleteMany({ username: req.body.username });
    console.log("blogs");
    console.log("User Deleted");
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error);
  }
});

//get
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(404).json(error);
  }
});

//All

export default router;
