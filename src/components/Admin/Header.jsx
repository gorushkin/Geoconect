import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../slices';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    user: { isAuthorized },
  } = useSelector((state) => state);

  const logoutHandler = () => {
    dispatch(actions.logout());
    router.push('admin/login');
  };

  return (
    <Navbar bg='primary' variant='dark' expand='lg'>
      <Container>
        <Navbar.Brand href='#home'>Geoconect</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Link href='/admin' passHref>
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link href='/admin/news' passHref>
              <Nav.Link>News</Nav.Link>
            </Link>
          </Nav>
          {isAuthorized && (
            <Nav>
              <NavDropdown title='User' id='basic-nav-dropdown'>
                <NavDropdown.Item href='#action/3.1'>Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={logoutHandler}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
