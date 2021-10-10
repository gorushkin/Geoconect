import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { authRequest } from '../../api';

const Login = () => {
  const [values, setValues] = useState({ email: '', password: '' });
  const onChange = (e) => setValues((value) => ({ ...value, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    try {
      const {
        data: { token },
      } = await authRequest(values);
      console.log('token: ', token);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <Container>
      <Row>
        <h1>Login</h1>
      </Row>
      <Row className='justify-content-center'>
        <Col lg={8}>
          <Form onSubmit={onSubmit}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={values.email}
                onChange={onChange}
                type='email'
                placeholder='Enter email'
                name='email'
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={onChange}
                type='password'
                placeholder='Password'
                name='password'
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicCheckbox'>
              <Form.Check type='checkbox' label='Check me out' />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
