import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { actions } from '../../slices';

const ModalWindow = () => {
  const { show, title, onConfirm, body } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(actions.hideModal());

  const onConfirmHandler = () => {
    handleClose();
    if (onConfirm) {
      onConfirm();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={onConfirmHandler}>
          OK
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalWindow;
