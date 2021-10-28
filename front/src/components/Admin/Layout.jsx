import { Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import LoginForm from '../../components/Admin/LoginForm';
import { useClient } from '../../hooks';
import Header from '../Admin/Header';

import ModalWindow from './ModalWindow';

const Layout = ({ children, title, closed = false }) => {
  const {
    user: { isAuthorized },
  } = useSelector((state) => state);

  return (
    <>
      <Header />
      <ModalWindow />
      <Container>
        <Row className="justify-content-center pt-3 mb-3">
          <h1 lg={8}>{title}</h1>
        </Row>
        <Row className="justify-content-center">{isAuthorized ? children : <LoginForm />}</Row>
      </Container>
    </>
  );
};
export default Layout;
