import express from "express";
import Exercise from "../models/exercise.model.js";

const router = express.Router();

//localhost:5000/exercises/
router.route("/").get(async (req, res) => {
  try {
    //User.find() is  a mongoose method that willlget get a list of all the users from the mongodb atlas  database
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (err) {
    res.status(400).json("Error : " + err);
  }
});

//localhost:5000/exercises/add
router.route("/add").post(async (req, res) => {
  try {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
      username,
      description,
      duration,
      date,
    });
    /*
    newExercise.save().then(() => res.json("Exercise added!"));
    */

    const response = await newExercise.save();
    res.json("Exercise added!");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

export default router;
