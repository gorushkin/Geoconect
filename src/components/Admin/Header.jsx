import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../slices';

const Header = () => {
  const dispatch = useDispatch();
  const {
    user: { isAuthorized },
  } = useSelector((state) => state);

  const logoutHandler = () => dispatch(actions.logout());

  return (
    <Navbar bg='primary' variant='dark' expand='lg'>
      <Container>
        <Navbar.Brand href='#home'>Geoconect</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='#home'>Home</Nav.Link>
            <Nav.Link href='#link'>News</Nav.Link>
          </Nav>
          {isAuthorized && (
            <Nav>
              <NavDropdown title='User' id='basic-nav-dropdown'>
                <NavDropdown.Item href='#action/3.1'>Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  // href='#action/3.4'
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
