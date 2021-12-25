import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import LoginForm from '../../components/Admin/LoginForm';

import Alert from './Alert';
import Header from './Header';
import ModalWindow from './ModalWindow';

const Layout = ({ children, title, closed = false }) => {
  const {
    user: { isAuthorized },
  } = useSelector((state) => state);


  const [isPageClosed, setIsPageClosed] = useState(true);

  useEffect(() => {
    setIsPageClosed(closed ? !isAuthorized : false);
  }, [isAuthorized, closed]);

  const pageTitle = isPageClosed ? 'Login' : title;

  return (
    <>
      <Header isPageClosed />
      <Alert />
      <ModalWindow />
      <Container>
        <Row className="justify-content-center pt-3 mb-3">
          <h1 lg={8}>{pageTitle}</h1>
        </Row>
        <div className="justify-content-center">{isPageClosed ? <LoginForm /> : children}</div>
      </Container>
    </>
  );
};
export default Layout;
