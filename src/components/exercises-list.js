import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

//exercise component for each exercise entry
const Exercise = ({ exercise, deleteExercise }) => (
  <tr>
    <td>{exercise.username}</td>
    <td>{exercise.description}</td>
    <td>{exercise.duration}</td>
    <td>{exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={`/edit/${exercise._id}`}>edit</Link> |
      <a
        href="#"
        onClick={() => {
          deleteExercise(exercise._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default function ExercisesList() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5000/exercises/");

        console.log("It just worked");
        setExercises(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  async function deleteExercise(id) {
    try {
      const response = await axios.delete(
        `http://localhost:5000/exercises/${id}`
      );
      console.log(response.data);

      setExercises(exercises.filter(el => el._id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  function exerciseList() {
    return exercises.map(currentExercise => {
      return (
        <Exercise
          exercise={currentExercise}
          deleteExercise={deleteExercise}
          key={currentExercise._id}
        />
      );
    });
  }

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration (in minutes)</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>{exerciseList()}</tbody>
      </table>
    </div>
  );
}
