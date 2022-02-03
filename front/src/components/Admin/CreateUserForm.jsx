import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { Row, Col, Form, Button, FloatingLabel } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import * as yup from 'yup';

import { getServerInfoRequest, PATH_ROUTES, testRequest } from '../../api';
import { createUserRequest } from '../../api';
import { useYupValidationResolver } from '../../hooks';
import { actions } from '../../slices';

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(4).required(),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const CreateUserForm = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const disaptch = useDispatch();
  const resolver = useYupValidationResolver(validationSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const router = useRouter()

  const onSubmit = async (values) => {
    const { data } = await createUserRequest(values);
    if (data) {
      disaptch(actions.showAlert({ body: data, color: 'success' }));
      router.push(PATH_ROUTES.ADMIN);
    }
  };

  const onTestButtonClickHandler = async () => {
    const response = await testRequest();
    console.log('response: ', response);
  };

  // TODO: инфу о сервере хранить в стейте

  const getSeverInfo = async () => {
    const { data } = await getServerInfoRequest();

    if (data) {
      setIsAdmin(data.isAdmin);
    }
  };

  useEffect(() => {
    getSeverInfo();
  }, []);

  const {
    user: { access },
  } = useSelector((state) => state);

  const showCreateUserForm = !isAdmin || access.admin;

  return (
    <>
      <Row className="mb-5">
        {showCreateUserForm ? (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <FloatingLabel controlId="floatingName" label="Enter name">
                <Form.Control
                  type="text"
                  {...register('name')}
                  placeholder="Enter name"
                  name="name"
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name && errors.name.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel controlId="floatingEmail" label="Enter email">
                <Form.Control
                  type="email"
                  {...register('email')}
                  placeholder="Enter email"
                  name="email"
                  autoComplete="off"
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email && errors.email.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <FloatingLabel controlId="floatingPassword" label="Enter password">
                <Form.Control
                  type="password"
                  {...register('password')}
                  placeholder="Password"
                  name="password"
                  autoComplete="off"
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password && errors.password.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
              <FloatingLabel controlId="floatingPasswordConfirm" label="Repeat password">
                <Form.Control
                  type="password"
                  {...register('passwordConfirm')}
                  placeholder="Password"
                  name="passwordConfirm"
                  autoComplete="off"
                  isInvalid={!!errors.passwordConfirm}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.passwordConfirm && errors.passwordConfirm.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        ) : (
          <p>Для регистрации свяжитесь с администратором ресурса</p>
        )}
      </Row>
      {access.admin && (
        <Row>
          <Col>
            <Button onClick={onTestButtonClickHandler} variant="success" type="button">
              test back
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
};

export default CreateUserForm;
