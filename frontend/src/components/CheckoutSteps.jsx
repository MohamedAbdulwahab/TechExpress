import { Button, Nav, NavItem } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

const CheckoutSteps = ({ stepOne, stepTwo, stepThree, stepFour }) => {
  return (
    <Nav className='justify-content-center my-4'>
      {/* stepOne: sign-in  */}
      <NavItem>
        {stepOne ? (
          <Link to='/login'>Sing In</Link>
        ) : (
          <Link className='disabled-link'>Sign In</Link>
        )}
      </NavItem>

      {/* stepTwo: shipping  */}
      <NavItem>
        {stepTwo ? (
          <Link to='/shipping'>Shipping</Link>
        ) : (
          <Link className='disabled-link'>Shipping</Link>
        )}
      </NavItem>

      {/* stepThree: payment  */}
      <NavItem>
        {stepThree ? (
          <Link to='/payment'>Payment</Link>
        ) : (
          <Link className='disabled-link'>Payment</Link>
        )}
      </NavItem>

      <NavItem>
        {stepFour ? (
          <Link to='/placeorder'>Place Order</Link>
        ) : (
          <Link className='disabled-link'>Place Order</Link>
        )}
      </NavItem>
    </Nav>
  );
};

export default CheckoutSteps;
