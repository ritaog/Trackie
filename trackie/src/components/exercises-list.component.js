import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.exercise._id}>edit</Link> |{" "}
      <a href="#" onClick={() => props.deleteExercise(props.exercise._id)}>
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
        "http://localhost:5000/exercises/" + id
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
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>{exerciseList()}</tbody>
      </table>
    </div>
  );
}
