import { useState } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import StartTask from "../pages/StartTask";

function ModalStartTask(props) {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow() {
    setFullscreen(true);
    setShow(true);
  }
  return (
    <>
      <Button onClick={handleShow}>Start task</Button>
      <Modal
        show={show}
        fullscreen={fullscreen.toString()}
        onHide={() => setShow(false)}
      >
        <Modal.Body>
          <StartTask id={props.id} onEnd={props.onEnd} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalStartTask;
