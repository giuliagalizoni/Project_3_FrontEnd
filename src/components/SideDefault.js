import no_task from "../assets/img/no_task.png";

function SideDefault() {
  return (
    <div className="side">
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img className="notasks-img" src={no_task} alt="sem task" />
        <p className="notasks-msg">
          Press “ + “ in the menu and create your tasks
        </p>
        <small>or</small>
        <p className="notasks-msg">Start your tasks for today!</p>
      </div>
    </div>
  );
}

export default SideDefault;
