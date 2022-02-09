import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import LoginForm from '../../components/Admin/LoginForm';
import { routes } from '../../constants';
import { useClient } from '../../hooks/useClient';
import { setDocumentTitle, getRoutes } from '../../utils';

import Alert from './Alert';
import Header from './Header';
import ModalWindow from './ModalWindow';

const Layout = ({ children, title }) => {
  const { user } = useSelector((state) => state);
  const [isPageOpened, setIsPageOpened] = useState(false);
  const { pathname } = useRouter();
  const isClient = useClient();

  useEffect(() => {
    setIsPageOpened(getRoutes(user.role, pathname, routes));
  }, [user, pathname]);

  const pageTitle = isPageOpened ? title : 'Login';

  if (isClient) setDocumentTitle(pageTitle);

  return (
    <>
      <Header isPageClosed />
      <Alert />
      <ModalWindow />
      <Container>
        <Row className="justify-content-center pt-3 mb-3">
          <h1 lg={8}>{pageTitle}</h1>
        </Row>
        <div className="justify-content-center pb-5">{isPageOpened ? children : <LoginForm />}</div>
      </Container>
    </>
  );
};
export default Layout;
