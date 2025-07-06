import { Modal, Button } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
}

const SuccessModal = ({ show, onHide }: Props) => (
  <Modal show={show} onHide={onHide} centered>
    <Modal.Header closeButton>
      <Modal.Title>Success</Modal.Title>
    </Modal.Header>
    <Modal.Body>Your referral has been sent successfully! 🎉</Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={onHide}>
        OK
      </Button>
    </Modal.Footer>
  </Modal>
);

export default SuccessModal;
