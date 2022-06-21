import api from '../apis/api';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

import './startTask.css';

import check from '../assets/img/icons/check.svg';

function StartTask(props) {
  const [state, setState] = useState({
    name: '',
    steps: [],
    field: '',
    // date: '',
    // starttime: '',
    // endtime: '',
    startdate: '',
    enddate: '',
    comments: '',
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/task/${props.id}`, {});
        setState({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [props.id]);

  const { _id, name, steps, startdate, enddate } = state;

  // console.log(state);

  return (
    <div className='side'>
      <div>
        <header className='starttask-header'>
          <h3>{name}</h3>
        </header>
        <div className='starttask-top'>
          <div className='title'>
            <img src={check} alt='Check icon' />
            <h1>Task list</h1>
          </div>
          {/* <div className='date-box'>
            <p className=''>{format(new Date(startdate), 'dd/MM/yyyy')},</p>
            <p className=''>
              {format(new Date(startdate), 'HH:mm')} -{' '}
              {format(new Date(enddate), 'HH:mm')}
            </p>
          </div> */}
          <p className='steps-text'>Checkmark the steps once you do it.</p>
        </div>
        <div className='steps'>
          <div className='icon-text-box'></div>
          <ul className='start-steps-list'>
            {steps.map((step) => (
              <li key={step._id} className='step-checkbox-item'>
                <input
                  type='checkbox'
                  id={step._id}
                  className='checkbox'
                  onClick={() => console.log('clicou', step.description)}
                />
                <label className='step-label' htmlFor={step._id}>
                  {step.description}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button className='btn-lg' onClick={props.onEnd}>
        End Task
      </button>
    </div>
  );
}
export default StartTask;
