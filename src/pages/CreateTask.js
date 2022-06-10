import React from "react";

import CreatableSelect from "react-select/creatable";
import { format } from "date-fns";

import "./taskForms.css";

import { useNavigate } from "react-router-dom";
import api from "../apis/api";
import { useState } from "react";
import FormControl from "../components/control/FormControl";
import SelectControl from "../components/control/SelectControl";
import BackBtn from "../components/BackBtn";

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
    date: format(new Date(), "yyyy-MM-dd"),
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
    // eslint-disable-next-line default-case
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
    <div className="container">
      <BackBtn />
      <form className="form-task" onSubmit={handleSubmit}>
        <FormControl
          label="Task name"
          labelclass="label-primary"
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
        <div className="creatable-div">
          <label htmlFor="selectCreatable" className="">
            Steps
          </label>
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
            id="selectCreatable"
          />
        </div>

        <SelectControl
          label="Field"
          labelclass="label"
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
          labelclass="label"
          id="date"
          name="date"
          onChange={handleChange}
          value={state.date}
        />
        <SelectControl
          label="Week Days"
          labelclass="label"
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

        <div className="time-container">
          <FormControl
            type="time"
            label="Start Time"
            labelclass="label"
            id="starttime"
            name="starttime"
            onChange={handleChange}
            value={state.starttime}
          />
          <FormControl
            type="time"
            label="End Time"
            labelclass="label"
            id="endtime"
            name="endtime"
            onChange={handleChange}
            value={state.endtime}
          />
        </div>

        <FormControl
          label="Comments"
          labelclass="label"
          id="comments"
          name="comments"
          onChange={handleChange}
          value={state.comments}
        />
        <button className="btn-lg" type="submit">
          Create Task
        </button>
      </form>
    </div>
  );
}

export default CreateTask;
