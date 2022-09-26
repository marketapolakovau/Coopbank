import React from "react";
import Modal from "react-bootstrap/Modal";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import "../css/loading.css";

function Loading() {
  return (
    <Modal.Body>
      <div className="loading-container">
        Okamžik prosím, načítám data...{" "}
        <Icon size={1} path={mdiLoading} spin={true} />
      </div>
    </Modal.Body>
  );
}

export default Loading;
