import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

//localhost:5000/users/
router.route("/").get(async (req, res) => {
  try {
    //User.find() is  a mongoose method that will get a list of all the users from the mongodb atlas  database
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(400).json("Error : " + err);
  }
});

//localhost:5000/users/add
router.route("/add").post(async (req, res) => {
  try {
    const newUser = await new User(req.body);
    await newUser.save();
    res.json("User added!");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

export default router;
