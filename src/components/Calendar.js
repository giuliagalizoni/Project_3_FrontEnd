import { startOfWeek, endOfWeek, format, eachDayOfInterval } from "date-fns";

import "./calendar.css";

function Calendar(props) {
  const today = new Date();
  const start = startOfWeek(today);
  const end = endOfWeek(today);

  const currentWeek = eachDayOfInterval({ start: start, end: end });

  return (
    <div className="calendar-container">
      {currentWeek.map((day) => {
        return (
          <div key={format(day, "yyyy-MM-dd")} className="day-container">
            <div className="week-day">{format(day, "EEEEE")}</div>
            <button
              className="day-btn"
              value={format(day, "yyyy-MM-dd")}
              onClick={props.onClick}
            >
              {format(day, "d")}
              <div
                className={
                  props.active === format(day, "yyyy-MM-dd")
                    ? "highlight"
                    : "no-highlight"
                }
              >
                {" "}
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Calendar;
