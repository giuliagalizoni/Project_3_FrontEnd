// import { useParams, useEffect, useState } from "react";
import trashcan from "../assets/img/icons/delete.svg";
// import api from "../apis/api";

function DeleteBtn() {
  //forma 1
  //     const  id  = useParams();
  //     useEffect(() => {
  //       const really = window.confirm("Are you sure you want to delete this task?");
  //       if (really) {
  //         api
  //           .delete(`/tasks/${id}`)
  //           .then((response) => {
  //             console.log(response.data);
  //           })
  //           .catch((err) => console.error(err));
  //       }
  //     }, [id]);

  //forma2
  // function DeleteBtn() {
  //     const { _id } = useParams();
  //     useEffect(() => {
  //       async function DeleteBtn() {
  //         const [state, setState] = useState([]);
  //         const really = window.confirm(
  //           "Are you sure you want to delete this task?"
  //         );
  //         if (really) {
  //           try {
  //             const response = await api.delete(`/tasks/${_id}`, {});
  //             setState([...response.data]);
  //           } catch (err) {
  //             console.error(err);
  //           }
  //         }
  //       }
  //       DeleteBtn();
  //     }, [_id]);

  //   return (
  //     <button className="delete-btn" onClick={DeleteBtn}>
  //       <img src={trashcan} alt="back" />
  //     </button>
  //   );
  <button className="delete-btn" onClick={DeleteBtn}>
    <img src={trashcan} alt="delete" />
  </button>;
}

export default DeleteBtn;
