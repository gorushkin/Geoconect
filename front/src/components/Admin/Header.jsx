import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { routes } from '../../api';
import { actions } from '../../slices';

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    user: { isAuthorized, name },
  } = useSelector((state) => state);

  const logoutHandler = () => {
    dispatch(actions.logout());
    router.push(routes.LOGIN);
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand>Geoconect</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href={routes.ADMIN} passHref>
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link href={routes.NEWS} passHref>
              <Nav.Link>News</Nav.Link>
            </Link>
            <Link href="/admin/add_news" passHref>
              <Nav.Link>Add News</Nav.Link>
            </Link>
            <Link href={routes.APPLICATIONS} passHref>
              <Nav.Link>Applications</Nav.Link>
            </Link>
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
