import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { actions } from '../../slices';

const ModalWindow = () => {
  const { show, body, type, color } = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  const [timer, setTimer] = useState();

  const handleClose = () => dispatch(actions.hideAlert());

  useEffect(() => {
    setTimer(
      setTimeout(() => {
        handleClose();
      }, 5000)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, body]);

  return (
    <div className="notification__alert">
      <Alert show={show} variant="danger" onClose={handleClose} dismissible>
        {/* <Alert.Heading>Hey, nice to see you</Alert.Heading> */}
        <p className="mb-0">{body}</p>
      </Alert>
    </div>
  );
};

export default ModalWindow;
