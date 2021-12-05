import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { actions } from '../../slices';

const Login = () => {
  const router = useRouter();
  const [values, setValues] = useState({ email: 'qwerty@qwe.com', password: '12345' });
  const onChange = (e) => setValues((value) => ({ ...value, [e.target.name]: e.target.value }));
  const dispatch = useDispatch();
  const { isAuthorized } = useSelector((state) => state.user);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(actions.authLogin(values));
  };

  useEffect(() => {
    if (isAuthorized) router.push('/admin/cms');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorized]);

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          value={values.email}
          onChange={onChange}
          type="email"
          placeholder="Enter email"
          name="email"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={onChange} type="password" placeholder="Password" name="password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Login;
