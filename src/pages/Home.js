import React from "react";

import Calendar from "../components/Calendar";
import Navbar from "../components/Navbar";
import NavBottom from "../components/NavBottom";
import DeleteBtn from "../components/Deletebtn";
import CreateTask from "./CreateTask";
import StartTask from "./StartTask";
import SideDefault from "../components/SideDefault";
import EditTask from "./EditTask";

import no_task from "../assets/img/no_task.png";
import clock from "../assets/img/icons/clock.svg";
import calendar from "../assets/img/icons/calendar.svg";
import check from "../assets/img/icons/check.svg";
import editbutton from "../assets/img/icons/edit.svg";

import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { format } from "date-fns";
import { Modal } from "react-bootstrap";
import api from "../apis/api";

import "./home.css";

function Home() {
  const { loggedInUser } = useContext(AuthContext);

  const [active, setActive] = useState(format(new Date(), "yyyy-MM-dd"));
  const [state, setState] = useState([]);
  const [showSideDefault, setShowSideDefault] = useState(true);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showStartTask, setShowStartTask] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  // Modal states
  const [fullscreen, setFullscreen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [currentActiveTask, setcurrentActiveTask] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [active]);

  async function fetchData() {
    try {
      const response = await api.get(`/tasks/${active}`, {});
      setState([...response.data]);
    } catch (err) {
      console.error(err);
    }
  }

  function handleDayClick({ target }) {
    setActive(target.value);
  }

  async function handleEndClick() {
    try {
      await api.patch(`/task/endtask/${taskId}`, {
        done: true,
      });

      fetchData();
      setShowStartTask(false);
      setShowSideDefault(true);
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  }
  const handleStartClick = (id) => {
    setTaskId(id);
    setShowStartTask(true);
    setShowSideDefault(false);
    setShowCreateTask(false);
  };

  const handleEditClick = (id) => {
    setTaskId(id);
    setShowEditTask(true);
    setShowStartTask(false);
    setShowSideDefault(false);
    setShowCreateTask(false);
  };

  useEffect(() => {
    const filtered = state.filter((task) => task.done === false);
    if (filtered.length) {
      setcurrentActiveTask(filtered[0]._id);
    }
  }, [state]);

  function handleShowModal(id) {
    setTaskId(id);
    setFullscreen(true);
    setShowModal(true);
  }

  return (
    // Div web--default criada apenas para organizar o layout responsivo
    <div className="web-container">
      <div className="container-default">
        <Navbar
          setShowCreateTask={setShowCreateTask}
          setShowSideDefault={setShowSideDefault}
          setShowStartTask={setShowStartTask}
        />
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
                const { _id, name, steps, date, startdate, enddate, done } =
                  task;
                return (
                  <div key={_id} className="task-card urgent">
                    {/* setar logica pra mudar de urgent pra not-urgent conforme a hora */}
                    <div className="task-top">
                      <h3>{name}</h3>
                      {!done ? (
                        <>
                          <button
                            disabled={_id !== currentActiveTask}
                            className="start-btn start-web"
                            onClick={() => {
                              handleStartClick(_id);
                            }}
                          >
                            Start
                          </button>

                          <button
                            disabled={_id !== currentActiveTask}
                            className="start-btn start-mobile"
                            onClick={() => handleShowModal(_id)}
                          >
                            Start
                          </button>
                        </>
                      ) : (
                        <p>DONE!</p>
                      )}
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
                          {format(new Date(startdate), "HH:mm")} -{" "}
                          {format(new Date(enddate), "HH:mm")}
                        </p>
                        <img src={calendar} alt="Calendar icon" />
                        <p className="date-time">
                          {format(new Date(startdate), "dd/MM/yyyy")}
                        </p>
                      </div>
                      {/* trocar por icons */}
                      <div className="icon-btns">
                        <button
                          className="icon-btn start-mobile"
                          onClick={() => navigate(`/edit_task/${_id}`)}
                        >
                          <img src={editbutton} alt="Edit task" />
                        </button>
                        <button
                          className="icon-btn start-web"
                          onClick={() => {
                            handleEditClick(_id);
                          }}
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

      <div className="show-side">
        {showSideDefault && <SideDefault />}
        {showCreateTask && <CreateTask />}
        {/* {showCreateTask && <CreateTask />} */}
        {showStartTask && <StartTask id={taskId} onEnd={handleEndClick} />}
        {showEditTask && <EditTask id={taskId} />}
      </div>

      <Modal
        show={showModal}
        fullscreen={fullscreen.toString()}
        onHide={() => setShowModal(false)}
      >
        <StartTask id={taskId} onEnd={handleEndClick} />
      </Modal>
    </div>
  );
}

export default Home;
