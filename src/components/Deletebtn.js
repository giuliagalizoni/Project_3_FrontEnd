import trashcan from "../assets/img/icons/delete.svg";
import api from "../apis/api";

function DeleteBtn(props) {
  async function handleDeleteBtn() {
    const really = window.confirm("Are you sure you want to delete this task?");
    if (really) {
      try {
        await api.delete(`/task/${props._id}`, {});
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <button className="icon-btn" onClick={handleDeleteBtn}>
      <img src={trashcan} alt="back" />
    </button>
  );
}

export default DeleteBtn;
