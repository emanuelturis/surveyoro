import React, { useState } from "react";
import { Modal as BootstrapModal } from "react-bootstrap";
import { Input } from "./Form";
import { Button } from "./Button";

interface Props {
  show: boolean;
  handleClose: Function;
  handleDelete: Function;
  type: string;
  name: string;
}

const DeleteModal: React.FC<Props> = ({
  show,
  handleClose,
  handleDelete,
  type,
  name,
}) => {
  const [input, setInput] = useState("");
  return (
    <div>
      <BootstrapModal show={show} onHide={handleClose}>
        <BootstrapModal.Header closeButton>
          <BootstrapModal.Title>Delete {type}</BootstrapModal.Title>
        </BootstrapModal.Header>
        <BootstrapModal.Body>
          <p>This acction cannot be undone.</p>
          <p>
            Once you delete this survey, all associated data, including all the
            stats, will be permanently erased.
          </p>
          <p>
            Please type <b>{name}</b> to confirm.
          </p>
          <Input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            name={name}
          />
        </BootstrapModal.Body>
        <BootstrapModal.Footer>
          <Button variant="cancel" onClick={() => handleClose()}>
            Close
          </Button>
          <Button
            variant="danger"
            disabled={input !== name}
            onClick={() => handleDelete()}
          >
            Delete {type}
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </div>
  );
};

export default DeleteModal;
