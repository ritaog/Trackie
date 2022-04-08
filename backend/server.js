import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import exercisesRouter from "./routes/exercises.js";
import usersRouter from "./routes/users.js";
import connectDB from "./models/db.js";

import path from "path";
const __dirname = path.resolve();

//dotenv.config();
//Load config
dotenv.config({ path: "./config/config.env" });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//connect to database
connectDB();

//Routes
//localhost:5000/exercises
app.use("/exercises", exercisesRouter);
//localhost:5000/users
app.use("/users", usersRouter);

app.use("/", express.static("./build"));
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
