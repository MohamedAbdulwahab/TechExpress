import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import {
  Form,
  FormGroup,
  FormLabel,
  FormCheck,
  Button,
  Row,
  Col,
} from 'react-bootstrap';
import { savePaymentMethod } from '../store/slices/cartSlice';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps stepOne stepTwo stepThree />

      <h1>Payment</h1>
      <Form onSubmit={handleFormSubmit}>
        <FormGroup>
          <FormLabel as='legend' className='pt-3 pb-2'>
            Select Method
          </FormLabel>
          <Col>
            <FormCheck
              type='radio'
              className='my-4'
              label='PayPal or Credit Card'
              id='paypal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></FormCheck>

            <Button type='submit' variant='primary'>
              Continue
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
