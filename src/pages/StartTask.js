import api from "../apis/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function StartTask() {
  const [state, setState] = useState({
    name: "",
    steps: [],
    field: "",
    date: "",
    weekday: "",
    starttime: "",
    endtime: "",
    comments: "",
  });

  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/task/${id}`, {});
        setState({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [id]);
  console.log(state);
  const { _id, name, steps, date, starttime, endtime } = state;
  return (
    <div className="container">
      <div className="task-top">
        <h3>{name}</h3>
      </div>
      <div className="task-bottom">
        <div className="icon-text-box">
          <p className="date-time">
            {starttime} - {endtime}
          </p>

          <p className="date-time">{date}</p>
        </div>
      </div>
      <div className="steps">
        <div className="icon-text-box">
          <p className="steps-text">Check your steps, once is done</p>
        </div>
        <ul className="">
          {steps.map((step) => (
            <li key={step._id} className="">
              <input type="checkbox" id={step._id} />
              <label htmlFor={step._id}>{step.description}</label>
            </li>
          ))}
        </ul>
        <button className="btn-lg" type="submit">
          End Task
        </button>
      </div>
    </div>
  );
}
export default StartTask;
