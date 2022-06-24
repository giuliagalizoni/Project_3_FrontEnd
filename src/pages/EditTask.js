import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
import { format } from 'date-fns';

import api from '../apis/api';
import './taskForms.css';

import FormControl from '../components/control/FormControl';
import SelectControl from '../components/control/SelectControl';
import BackBtn from '../components/BackBtn';

const components = {
  DropdownIndicator: null,
};

const field = [
  { value: 'Work', label: 'Work' },
  { value: 'Home', label: 'Home' },
  { value: 'Education', label: 'Education' },
];

const createOption = (label) => ({
  label,
  value: label,
});

function EditTask(props) {
  const [state, setState] = useState({
    name: '',
    steps: [],
    field: 'Work',
    date: '',
    starttime: '',
    endtime: '',
    comments: '',
  });

  const [selectStep, setSelectStep] = useState({ inputValue: '', value: [] });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fetchTask() {
      try {
        const response = await api.get(`/task/${props.id ? props.id : id}`);

        let stepsArr = [];
        response.data.steps.map((step) =>
          stepsArr.push({ label: step.description, value: step.description })
        );

        setSelectStep({ ...selectStep, value: [...stepsArr] });

        setState({
          ...response.data,
          date: format(new Date(response.data.startdate), 'yyyy-MM-dd'),
          starttime: format(new Date(response.data.startdate), 'HH:mm'),
          endtime: format(new Date(response.data.enddate), 'HH:mm'),
        });
      } catch (err) {
        console.error(err);
      }
    }
    fetchTask();
  }, [props.id, id]);

  function handleInputChange(inputValue) {
    setSelectStep({ ...selectStep, inputValue });
  }

  function handleKeyDown(event) {
    const { inputValue, value } = selectStep;
    if (!inputValue) return;
    // eslint-disable-next-line default-case
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setSelectStep({
          inputValue: '',
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
      const data = { ...state };
      // delete data._id;

      await api.patch(`/task/${props.id ? props.id : id}`, {
        ...data,
        steps: selectStep.value,
      });

      if (props.id) {
        props.onEdit(false);
        props.onDefault(true);
        window.location.reload();
        return;
      }
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className='form-side side'>
      <BackBtn />
      <form className='form-task' onSubmit={handleSubmit}>
        <FormControl
          label='Task name'
          labelclass='label-primary'
          id='newtaskname'
          name='name'
          onChange={handleChange}
          value={state.name}
          placeholder='Task Name'
          max='200'
        />

        {/* <FormControl
        label="Step"
        id="newstepname"
        name="step"
        onChange={handleChange}
        value={state.steps}
      />
      <button >+</button> */}
        <div className='creatable-div'>
          <label htmlFor='selectCreatable' className=''>
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
            placeholder='Type something and press enter...'
            value={selectStep.value}
            id='selectCreatable'
          />
        </div>

        <SelectControl
          label='Field'
          labelclass='label'
          id='fieldselect'
          name='field'
          onChange={handleChange}
          value={state.field}
        >
          <option disabled value='0'>
            Select
          </option>
          {field.map((currentOptionObj) => (
            <option key={currentOptionObj.value} value={currentOptionObj.value}>
              {currentOptionObj.label}
            </option>
          ))}
        </SelectControl>
        {state.date && (
          <FormControl
            type='date'
            label='Date'
            labelclass='label'
            id='date'
            name='date'
            onChange={handleChange}
            value={state.date}
          />
        )}
        {/* <p>{format(new Date(state.date), 'cccc')}</p> */}

        {state.starttime && state.endtime && (
          <div className='time-container'>
            <FormControl
              type='time'
              label='Start Time'
              labelclass='label'
              id='starttime'
              name='starttime'
              onChange={handleChange}
              value={state.starttime}
            />
            <FormControl
              type='time'
              label='End Time'
              labelclass='label'
              id='endtime'
              name='endtime'
              onChange={handleChange}
              value={state.endtime}
            />
          </div>
        )}

        <FormControl
          label='Comments'
          labelclass='label'
          id='comments'
          name='comments'
          onChange={handleChange}
          value={state.comments}
        />
        <button className='btn-lg' type='submit'>
          Edit Task
        </button>
      </form>
    </div>
  );
}

export default EditTask;
