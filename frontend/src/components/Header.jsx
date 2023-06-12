import { Container, Nav, Navbar, Badge, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { useLogoutMutation } from '../store/slices/usersApiSlice';

function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.login);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const itemsInCart = cartItems.reduce((acc, currentItem) => {
    return acc + Number(currentItem.quantity);
  }, 0);

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

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
              {/* cart  */}
              <Nav.Link as={Link} to='/cart'>
                <i className='fa fa-shopping-cart'></i> Cart{' '}
                {cartItems.length > 0 && (
                  <Badge bg='primary'>{itemsInCart}</Badge>
                )}
              </Nav.Link>

              {/* sign in or userInfo */}
              {userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  id='username'
                  className='m-0'
                >
                  <NavDropdown.Item as={Link} to='/profile'>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to='/login'>
                  <i className='fa fa-user'></i> Sign In
                </Nav.Link>
              )}

              {/* admin configurations */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  {/* products settings  */}
                  <NavDropdown.Item as={Link} to='/admin/productlist'>
                    Products
                  </NavDropdown.Item>

                  {/* orders settings  */}
                  <NavDropdown.Item as={Link} to='/admin/userlist'>
                    Users
                  </NavDropdown.Item>

                  <NavDropdown.Item as={Link} to='/admin/orderlist'>
                    Orders
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
