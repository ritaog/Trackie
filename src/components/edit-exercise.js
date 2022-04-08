import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditExercise = () => {
  let { id } = useParams();

  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  let userInput = useRef();

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`http://localhost:5000/exercises/${id}`);
      const { username, description, duration, date } = response.data;
      setUsername(username);
      setDescription(description);
      setDuration(duration);
      setDate(new Date(`${date}`));
    };
    getData();
  }, [id]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("http://localhost:5000/users/");

      if (response.data >= 0) return;
      setUsers(response.data.map(user => user.username));
    };
    getData();
  }, []);

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

  const onSubmit = async e => {
    e.preventDefault();

    const exercise = {
      username,
      description,
      duration,
      date,
    };

    await axios.post(`http://localhost:5000/exercises/update/${id}`, exercise);

    window.location = "/";
  };

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            // ref="userInput"
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
};

export default EditExercise;
