import { useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { getServerInfoRequest, testRequest } from '../../api';
import { asyncActions } from '../../slices/user';

const CreateUserForm = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const disaptch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => disaptch(asyncActions.createUser(data));

  const onTestButtonClickHandler = async () => {
    const response = await testRequest();
    console.log('response: ', response);
  };

  const getSeverInfo = async () => {
    const {
      data: { isAdmin },
    } = await getServerInfoRequest();
    setIsAdmin(isAdmin);
  };

  useEffect(() => {
    getSeverInfo();
  }, []);

  return (
    <>
      <Row className="mb-5">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>User name</Form.Label>
            <Form.Control type="text" {...register('name')} placeholder="Enter name" name="name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              {...register('email')}
              placeholder="Enter email"
              name="email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              {...register('password')}
              placeholder="Password"
              name="password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Row>
      <Row>
        <Col>
          <Button onClick={onTestButtonClickHandler} variant="success" type="button">
            test back
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default CreateUserForm;
