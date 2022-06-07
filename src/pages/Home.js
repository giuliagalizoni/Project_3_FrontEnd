import React from "react";
import Calendar from "../components/Calendar";
import Navbar from "../components/Navbar";
import { useState } from "react";

import { format } from "date-fns";

function Home() {
  const [active, setActive] = useState(format(new Date(), "yyyy-MM-dd"));

  function handleDayClick({ target }) {
    setActive(target.value);
    console.log(active);

    // fazer o api.get aqui
  }

  return (
    <div className="text-center">
      <Navbar />
      <p>This is the homepage</p>

      <Calendar onClick={handleDayClick} active={active} />
    </div>
  );
}

export default Home;
