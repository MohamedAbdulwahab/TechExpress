import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <Navbar collapseOnSelect bg='dark' variant='dark' expand='lg'>
        <Container>
          <Navbar.Brand as={Link} to='/'>
            Tech-Express
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='ms-auto'>
              <Nav.Link as={Link} to='/cart'>
                <i className='fa fa-shopping-cart'></i> Cart
              </Nav.Link>
              <Nav.Link as={Link} to='/login'>
                <i className='fa fa-user'></i> Sign In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
