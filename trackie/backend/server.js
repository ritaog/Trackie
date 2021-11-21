import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import exercisesRouter from "./routes/exercises.js";
import usersRouter from "./routes/users.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//connect to database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//Routes
//localhost:5000/exercises
app.use("/exercises", exercisesRouter);
//localhost:5000/users
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
