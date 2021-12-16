import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { PATH_ROUTES } from '../../api';
import { routes } from '../../constants';
import { actions } from '../../slices';

const Header = ({ isPageClosed }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    user: { isAuthorized, name },
  } = useSelector((state) => state);

  const logoutHandler = () => {
    dispatch(actions.logout());
    router.push(PATH_ROUTES.LOGIN);
  };

  const filteredRoutes = useMemo(
    () => (isAuthorized ? routes : routes.filter(({ closed }) => !closed)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isAuthorized]
  );

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand>Geoconect</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {filteredRoutes.map((route, id) => (
              <Link key={id} href={route.href} passHref>
                <Nav.Link>{route.name}</Nav.Link>
              </Link>
            ))}
          </Nav>
          {isAuthorized && (
            <Nav>
              <NavDropdown title={name} id="basic-nav-dropdown">
                <NavDropdown.Item>Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
