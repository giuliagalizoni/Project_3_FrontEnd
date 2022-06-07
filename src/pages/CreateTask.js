import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../apis/api";
import { useState } from "react";
import FormControl from "../components/control/FormControl";
import SelectControl from "../components/control/SelectControl";


const field = [
  { value: 0, label: "Work" },
  { value: 1, label: "Home" },
  { value: 2, label: "Education" },
];

const weekDay = [
  { value: 0, label: "Sun" },
  { value: 1, label: "Mon" },
  { value: 2, label: "Tue" },
  { value: 3, label: "Wed" },
  { value: 4, label: "Thu" },
  { value: 5, label: "Fri" },
  { value: 6, label: "Sat" },
];



function CreateTask() {
    const [state, setState] = useState({
    name: "",
    steps: [],
    field: "",
    date: "2022-01-01",
    weekday: "",
    starttime: "00:00",
    endtime: "00:00",
    comments: "",
  });
  const navigate = useNavigate();
  function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await api.post("/task", state);
      console.log(response.data);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl
        label="Name"
        id="newtaskname"
        name="name"
        onChange={handleChange}
        value={state.name}
        placeholder="Task Name"
      />
      <FormControl
        label="Step"
        id="newstepname"
        name="step"
        onChange={handleChange}
        value={state.steps}
      />
      <button >+</button>
      <SelectControl
        label="Field"
        id="fieldselect"
        name="field"
        onChange={handleChange}
        value={state.field}
      >
        <option disabled value="0">
          Select
        </option>
        {field.map((currentOptionObj) => (
          <option key={currentOptionObj.value} value={currentOptionObj.value}>
            {currentOptionObj.label}
          </option>
        ))}
      </SelectControl>
      <FormControl
        type="date"
        label="Date"
        id="date"
        name="date"
        onChange={handleChange}
        value={state.date}
      />
      <SelectControl
        label="Week Days"
        id="weekdays"
        name="weekdays"
        onChange={handleChange}
        value={state.weekday}
      >
        <option disabled value="0">
          Select
        </option>
        {weekDay.map((currentOptionObj) => (
          <option key={currentOptionObj.value} value={currentOptionObj.value}>
            {currentOptionObj.label}
          </option>
        ))}
      </SelectControl>
      <FormControl
        type="time"
        label="Start Time"
        id="starttime"
        name="starttime"
        onChange={handleChange}
        value={state.starttime}
      />
      <FormControl
        type="time"
        label="End Time"
        id="endtime"
        name="endtime"
        onChange={handleChange}
        value={state.endtime}
      />
      <FormControl
        label="Comments"
        id="comments"
        name="comments"
        onChange={handleChange}
        value={state.comments}
      />
      <button type="submit">Create Task</button>
    </form>
  );
}
export default CreateTask;
