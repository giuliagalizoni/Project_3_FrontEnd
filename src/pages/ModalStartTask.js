import { useState } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import StartTask from "./StartTask";

function ModalStartTask(props) {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow() {
    setFullscreen(true);
    setShow(true);
  }
  return (
    <div>
      <Button onClick={handleShow}>Start task</Button>
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton />
        <Modal.Body>
          <StartTask id={props.id} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ModalStartTask;
