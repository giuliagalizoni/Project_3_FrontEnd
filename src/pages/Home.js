import React from "react";
import Calendar from "../components/Calendar";
import Navbar from "../components/Navbar";
import no_task from "../assets/img/no_task.png"
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/authContext";
import { format } from "date-fns";
import api from "../apis/api";

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
    <div>
      <Navbar />
      <div className="text-center">
        <h1> Welcome {loggedInUser.user.name}</h1>
      </div>
      <Calendar onClick={handleDayClick} active={active} />
      {!state.length ? (
        <div>
          <img src={no_task} alt="sem task"/>
          <p>Pressione o “ + “ no menu abaixo 
e comece suas tarefas</p>
        </div>
      ) : (
        <div>
          {state.map((task) => {
            return task.name;
          })}
        </div>
      )}
    </div>
  );
}

export default Home;
