import { Container, Row, Col, Jumbotron } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CMS from '../components/Admin/CMS'
import Login from '../components/Admin/Login'

const Admin = () => {
  const { user: { isAuthorized } } = useSelector(state => state)
  return (
    <Container>
      <Row>
        <h1>Welcome To CMS</h1>
      </Row>
      <Row>
        {isAuthorized ? <CMS /> : <Login />}
      </Row>
    </Container>
  );
};

export default Admin;
