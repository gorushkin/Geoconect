import Header from '../Admin/Header';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
