import { useRouter } from 'next/router';
import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { useClient } from '../../hooks';
import Header from '../Admin/Header';

const Layout = ({ children, title, closed = false }) => {
  const isClient = useClient();
  const router = useRouter();

  const {
    user: { isAuthorized },
  } = useSelector((state) => state);

  if (isClient && closed && !isAuthorized) router.push('/admin/login');

  const isShown = isClient && (closed ? isAuthorized : true);

  return isShown ? (
    <>
      <Header />
      <Container>
        <Row className="justify-content-center pt-3">
          <h1 lg={8}>{title}</h1>
        </Row>
        <Row className="justify-content-center">{children}</Row>
      </Container>
    </>
  ) : null;
};
export default Layout;
