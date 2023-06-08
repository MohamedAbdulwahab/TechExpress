import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap';
import { saveShippingAddress } from '../store/slices/cartSlice';

const ShippingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // dispatch the saveShippingAddress action.
    dispatch(saveShippingAddress({ address, city, postalCode, country }));

    // navigate to payment page
    navigate('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps stepOne stepTwo />

      <h1 className='my-3'>Shipping</h1>

      <Form onSubmit={handleFormSubmit}>
        {/* address  */}
        <FormGroup controlId='address' className='my-2'>
          <FormLabel>Address</FormLabel>
          <FormControl
            type='text'
            placeholder='Enter address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></FormControl>
        </FormGroup>

        {/* city  */}
        <FormGroup controlId='city' className='my-2'>
          <FormLabel>City</FormLabel>
          <FormControl
            type='text'
            placeholder='Enter city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></FormControl>
        </FormGroup>

        {/* postal code  */}
        <FormGroup controlId='postalCode' className='my-2'>
          <FormLabel>Postal Code</FormLabel>
          <FormControl
            type='text'
            placeholder='Enter Postal Code'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></FormControl>
        </FormGroup>

        {/* country  */}
        <FormGroup controlId='country' className='my-2'>
          <FormLabel>Country</FormLabel>
          <FormControl
            type='text'
            placeholder='Enter Country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></FormControl>
        </FormGroup>

        <Button variant='primary' type='submit' className='my-3'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
