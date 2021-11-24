import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function EditExercise() {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  const userInput = useRef();

  useEffect(() => {
    async function fetchExerciseData(props) {
      try {
        const response = await axios.get(
          "http://localhost:5000/exercises/" + props.match.params.id
        );
        setUsername(response.data.username);
        setDescription(response.data.description);
        setDuration(response.data.duration);
        setDate(new Date(response.data.date));
        /*
        if (response.data.length > 0) {
          setUsers(response.data.map(user => user.username));
        } */
      } catch (err) {
        console.log(err);
      }
    }

    async function fetchUserData() {
      try {
        const response = await axios.get("http://localhost:5000/users");

        if (response.data.length > 0) {
          setUsers(response.data.map(user => user.username));
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchExerciseData();
    fetchUserData();
  });

  const onChangeUsername = e => {
    setUsername(e.target.value);
  };

  const onChangeDescription = e => {
    setDescription(e.target.value);
  };

  const onChangeDuration = e => {
    setDuration(e.target.value);
  };

  const onChangeDate = date => {
    setDate(date);
  };

  const onSubmit = async (e, props) => {
    e.preventDefault();

    const exercise = {
      username,
      description,
      duration,
      date,
    };

    console.log(exercise);

    try {
      const res = await axios.post(
        "http://localhost:5000/exercises/update" + props.match.params.id,
        exercise
      );

      console.log(res.data);

      window.location = "/";
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            //ref="userInput"
            ref={userInput}
            required
            className="form-control"
            value={username}
            onChange={onChangeUsername}
          >
            {users.map(user => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>

        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={description}
            onChange={onChangeDescription}
          />
        </div>

        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={duration}
            onChange={onChangeDuration}
          />
        </div>

        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={date} onChange={onChangeDate} />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
