import "./ConfirmationModal.css";
import Modal from "../Modal/Modal";
import { TriangleAlert } from "lucide-react";

function ConfirmationModal({ onConfirm, onCancel, message }) {
  const handleConfirm = () => {
    onConfirm();
    onCancel();
  };
  return (
    <Modal onClose={onCancel}>
      <div className="confirmation-modal-container">
        <div className="confirmation-modal-body">
          <TriangleAlert size={32} color="red" />
          <div className="confirmation-modal-message">
            <h4>Confirm Deletion</h4>
            <p>{message}</p>
          </div>
        </div>
        <div className="confirmation-modal-button-container">
          <button
            className="confirmation-modal-cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="confirmation-modal-confirm-button"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmationModal;
