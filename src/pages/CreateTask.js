import React from "react";

import CreatableSelect from "react-select/creatable";
// import { ActionMeta, OnChangeValue } from "react-select";

import { useNavigate } from "react-router-dom";
import api from "../apis/api";
import { useState } from "react";
import FormControl from "../components/control/FormControl";
import SelectControl from "../components/control/SelectControl";

const components = {
  DropdownIndicator: null,
};

const field = [
  { value: "Work", label: "Work" },
  { value: "Home", label: "Home" },
  { value: "Education", label: "Education" },
];

const weekDay = [
  { value: "Sun", label: "Sun" },
  { value: "Mon", label: "Mon" },
  { value: "Tue", label: "Tue" },
  { value: "Wed", label: "Wed" },
  { value: "Thu", label: "Thu" },
  { value: "Fri", label: "Fri" },
  { value: "Sat", label: "Sat" },
];

const createOption = (label) => ({
  label,
  value: label,
});

function CreateTask() {
  const [state, setState] = useState({
    name: "",
    steps: [],
    field: "Work",
    date: "2022-01-01",
    weekday: "Mon",
    starttime: "00:00",
    endtime: "00:00",
    comments: "",
  });

  const [selectStep, setSelectStep] = useState({ inputValue: "", value: [] });

  const navigate = useNavigate();

  function handleInputChange(inputValue) {
    setSelectStep({ ...selectStep, inputValue });
    console.log(selectStep);
  }

  function handleKeyDown(event) {
    const { inputValue, value } = selectStep;
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setSelectStep({
          inputValue: "",
          value: [...value, createOption(inputValue)],
        });
        event.preventDefault();
    }
  }

  function handleChange(event) {
    //  If criado por causa da biblioteca CreatableSelect
    console.log(event);
    if (!event.target) {
      // Event nesse caso é o value do component CreatableSelect
      setSelectStep({ ...selectStep, value: [...event] });
      return;
    }
    setState({ ...state, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await api.post("/task", {
        ...state,
        steps: selectStep.value,
      });
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

      {/* <FormControl
        label="Step"
        id="newstepname"
        name="step"
        onChange={handleChange}
        value={state.steps}
      />
      <button >+</button> */}

      <CreatableSelect
        components={components}
        inputValue={selectStep.inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={handleChange}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type something and press enter..."
        value={selectStep.value}
      />

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
        id="weekday"
        name="weekday"
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
