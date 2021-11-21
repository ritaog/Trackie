import express from "express";
import Exercise from "../models/exercise.model.js";

const router = express.Router();

//GET
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

//POST
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

    const response = await newExercise.save();
    res.json("Exercise added!");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

//GET
//localhost:5000/exercises/:id
router.route("/:id").get(async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    res.json(exercise);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

//DELETE
//localhost:5000/exercises/:id
router.route("/:id").delete(async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id);
    res.json("Exercise deleted");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

//POST
//localhost:5000/exercises/update/:id
router.route("/update/:id").post(async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    exercise.username = req.body.username;
    exercise.description = req.body.description;
    exercise.duration = Number(req.body.duration);
    exercise.date = Date.parse(req.body.date);

    const response = await exercise.save();
    res.json("Exercise updated!");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

export default router;
