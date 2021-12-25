import Link from 'next/dist/client/link';
import { useRouter } from 'next/router';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { PATH_ROUTES } from '../../api';
import { asyncActions } from '../../slices';

const Login = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const { push } = useRouter();

  const onSubmit = async (data) => dispatch(asyncActions.authLogin(data));

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control {...register('email')} type="email" placeholder="Enter email" name="email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          {...register('password')}
          type="password"
          placeholder="Password"
          name="password"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Row className="align-items-center">
        <Col lg={2}>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Col>
        <Col>
          <Link href={PATH_ROUTES.SIGN_UP}>
            <a>Create account</a>
          </Link>
        </Col>
      </Row>
    </Form>
  );
};

export default Login;
