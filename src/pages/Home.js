import React from "react";
import Calendar from "../components/Calendar";
import Navbar from "../components/Navbar";

function Home() {
  function handleDayClick({ target }) {
    console.log(target.value);

    // fazer o api.get aqui
  }

  return (
    <div className="text-center">
      <Navbar />
      <p>This is the homepage</p>

      <Calendar onClick={handleDayClick} />
    </div>
  );
}

export default Home;
