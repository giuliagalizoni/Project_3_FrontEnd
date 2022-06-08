import React from "react";
import Calendar from "../components/Calendar";
import Navbar from "../components/Navbar";
import no_task from "../assets/img/no_task.png";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/authContext";
import { format } from "date-fns";
import api from "../apis/api";

import "./home.css";

function Home() {
  const { loggedInUser } = useContext(AuthContext);

  const [active, setActive] = useState(format(new Date(), "yyyy-MM-dd"));

  const [state, setState] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/tasks/${active}`, {});
        setState([...response.data]);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [active]);

  function handleDayClick({ target }) {
    setActive(target.value);
    console.log(active);

    // fazer o api.get aqui
  }

  return (
    <div className="container">
      <Navbar />

      <div className="text-center">
        <h1> Welcome {loggedInUser.user.name}</h1>
      </div>

      <div>
        <Calendar onClick={handleDayClick} active={active} />
      </div>

      {!state.length ? (
        <div>
          <img src={no_task} alt="sem task" />
          <p>Press “ + “ in the menu and create your tasks</p>
        </div>
      ) : (
        <div>
          {state.map((task) => {
            const {
              _id,
              name,
              steps,
              field,
              date,
              weekday,
              starttime,
              endtime,
              comments,
            } = task;
            return (
              <div key={_id}>
                <div>
                  <h2>{name}</h2>
                  <button>Start</button>
                </div>
                <div>
                  <small>Steps:</small>
                  <ul>
                    {steps.map((step) => (
                      <li>{step.description}</li>
                    ))}
                  </ul>
                  <small>Start your task and don't forget to check it!</small>
                </div>
                <div>Progress:</div>
                <div>
                  <p>
                    {starttime} - {endtime}
                  </p>
                  <p>{date}</p>
                  {/* trocar por icons */}
                  <button>delete</button>
                  <button>edit</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Home;
