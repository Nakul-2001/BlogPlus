import express from "express";
import { User } from "../Models/User.js";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import toast from 'react-hot-toast'

const router = express.Router();

//Register
router.post("/register", async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      fullname: req.body.fullname,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SEC
      ).toString(),
      profilePic: req.body.profilePic,
    });

    const user = await newUser.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {

    console.log('in login');
    
    const user = await User.findOne({ username: req.body.username });

    !user && res.status(400).json("Invalid Credentials");

    const originalPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SEC
    ).toString(CryptoJS.enc.Utf8);

    req.body.password != originalPassword && res.status(400).json("Invalid Credentials");

    const accessToken = jwt.sign(
      {
        username: user.username,
        password: user.password,
      },
      process.env.JWT_SEC
    );

    const { password, ...others } = user._doc;

    res.json({ ...others, accessToken });
  } catch (error) {
    res.json(error);
  }
});

export default router;
