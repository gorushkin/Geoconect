import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import CreateUserForm from './CreateUserForm';

const CMS = () => {
  const { user } = useSelector((state) => state);

  return <>{user.isAdmin && <CreateUserForm />}</>;
};

export default CMS;
