import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import UserContext from "../context/UserProvider";
import { useNavigate } from "react-router-dom";

function DeleteModal({ showDeleteModal, setShowDeleteModal, id }) {
  const navigate = useNavigate();
  const { deleteRequest } = useContext(UserContext);
  return (
    <Modal show={showDeleteModal}>
      <Modal.Header>
        <Modal.Title>Smazat žádost</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Opravdu chcete tuto žádost smazat?</p>
      </Modal.Body>

      <Modal.Footer>
        <button
          className="outline-dark-button"
          onClick={() => {
            setShowDeleteModal(!showDeleteModal);
          }}
        >
          NE
        </button>
        <button
          className="danger-button"
          onClick={() => {
            deleteRequest(id);
            navigate("/admin");
          }}
        >
          ANO
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
