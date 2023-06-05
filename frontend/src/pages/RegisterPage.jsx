import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { useRegisterMutation } from '../store/slices/usersApiSlice';
import { register } from '../store/slices/authSlice';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import {
  Form,
  Button,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap';

const LoginPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [registerApiCall, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.login);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // register
    try {
      const res = await registerApiCall({ name, email, password }).unwrap();
      dispatch(register({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1 className='pt-3'>Sign In</h1>

      <Form onSubmit={handleFormSubmit}>
        {/* name  */}
        <FormGroup controlId='name' className='py-3'>
          <FormLabel>Name</FormLabel>
          <FormControl
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></FormControl>
        </FormGroup>

        {/* email  */}
        <FormGroup controlId='email' className='py-3'>
          <FormLabel>Email Address</FormLabel>
          <FormControl
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></FormControl>
        </FormGroup>

        {/* password  */}
        <FormGroup controlId='password' className='py-3'>
          <FormLabel>Password</FormLabel>
          <FormControl
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></FormControl>
        </FormGroup>

        {/* confirm password  */}
        <FormGroup controlId='confirmPassword' className='py-3 '>
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></FormControl>
        </FormGroup>

        <Button
          variant='primary'
          type='submit'
          disabled={
            isLoading ||
            password !== confirmPassword ||
            password === '' ||
            confirmPassword === ''
          }
          className='mt-2'
        >
          {isLoading ? (
            <Spinner
              as='span'
              animation='border'
              size='sm'
              role='status'
              aria-hidden='true'
            />
          ) : (
            'Register'
          )}
        </Button>

        <Row className='py-3'>
          <Col>
            Already have an account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Sign In
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default LoginPage;
