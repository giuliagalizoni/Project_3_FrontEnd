import React from "react";
import Calendar from "../components/Calendar";
import Navbar from "../components/Navbar";
import NavBottom from "../components/NavBottom";
import DeleteBtn from "../components/Deletebtn";
import CreateTask from "./CreateTask";

import no_task from "../assets/img/no_task.png";
import clock from "../assets/img/icons/clock.svg";
import calendar from "../assets/img/icons/calendar.svg";
import check from "../assets/img/icons/check.svg";
import editbutton from "../assets/img/icons/edit.svg";

import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { format } from "date-fns";
import api from "../apis/api";

import "./home.css";

function Home() {
  const { loggedInUser } = useContext(AuthContext);

  const [active, setActive] = useState(format(new Date(), "yyyy-MM-dd"));
  const [state, setState] = useState([]);
  const [showCreateTask, setShowCreateTask] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/tasks/${active}`, {});
        setState([...response.data]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [active]);

  function handleDayClick({ target }) {
    setActive(target.value);
    // fazer o api.get aqui
  }

  return (
    // Div web-container criada apenas para organizar o layout responsivo
    <div className="web-container">
      <div className="container">
        <Navbar setShowCreateTask={setShowCreateTask} />
        <div className="header">
          <h1> Welcome, {loggedInUser.user.name}!</h1>
        </div>

        <div>
          <Calendar onClick={handleDayClick} active={active} />
        </div>

        <div className="tasks-container">
          <h2>Tasks</h2>
          {!state.length ? (
            <div className="taskcards-group">
              <img className="notasks-img" src={no_task} alt="sem task" />
              <p className="notasks-msg">
                Press “ + “ in the menu and create your tasks
              </p>
            </div>
          ) : (
            <div className="taskcards-group">
              {state.map((task) => {
                const { _id, name, steps, date, starttime, endtime } = task;
                return (
                  <div key={_id} className="task-card urgent">
                    {/* setar logica pra mudar de urgent pra not-urgent conforme a hora */}
                    <div className="task-top">
                      <h3>{name}</h3>
                      <button className="start-btn">Start</button>
                    </div>
                    <div className="steps">
                      <div className="icon-text-box">
                        <img src={check} alt="check" />
                        <p className="steps-text">Steps:</p>
                      </div>
                      <div className="step-list">
                        {steps.map((step) => (
                          <div key={step._id} className="step-item">
                            <div className="status" />
                            <p>{step.description}</p>
                          </div>
                        ))}
                      </div>
                      <div className="icon-text-box">
                        <img src={check} alt="check" />
                        <p className="steps-text">
                          Start your task and don't forget to check it!
                        </p>
                      </div>
                    </div>
                    {/* <div>Progress:</div> */}
                    <div className="task-bottom">
                      <div className="icon-text-box">
                        <img src={clock} alt="Clock icon" />
                        <p className="date-time">
                          {starttime} - {endtime}
                        </p>
                        <img src={calendar} alt="Calendar icon" />
                        <p className="date-time">{date}</p>
                      </div>
                      {/* trocar por icons */}
                      <div className="icon-btns">
                        <button
                          className="icon-btn"
                          onClick={() => navigate(`/edit_task/${_id}`)}
                        >
                          <img src={editbutton} alt="Edit task" />
                        </button>
                        <DeleteBtn _id={_id} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <NavBottom />
      </div>
      {showCreateTask && <CreateTask />}
      {/* {showCreateTask ? <CreateTask /> : null} */}
    </div>
  );
}

export default Home;
