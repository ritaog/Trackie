import React, { useState } from "react";
import axios from "axios";

export default function CreateUsers() {
  const [username, setUsername] = useState("");

  const onChangeUsername = e => {
    setUsername(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();

    const user = {
      username,
    };

    try {
      await axios.post("http://localhost:5000/users/add", user);

      setUsername("");
    } catch (err) {
      console.error(err);
    }

    window.location = "/";
  };

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            required
            className="form-control"
            value={username}
            onChange={onChangeUsername}
          />
        </div>
        <div>
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
