import { useState, useEffect } from 'react';
import {
  Form,
  Table,
  Button,
  Container,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import SpinnerLoader from '../components/SpinnerLoader';
import { useProfileMutation } from '../store/slices/usersApiSlice';
import { setCredentials } from '../store/slices/authSlice';
import { useGetMyOrdersQuery } from '../store/slices/ordersApiSlice';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  // get user info
  const { userInfo } = useSelector((state) => state.login);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo, userInfo.name, userInfo.email]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();

        dispatch(setCredentials(res));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || error.error);
      }
    }
  };

  return (
    <div>
      <Container>
        <Row>
          <Col md={3}>
            <h2 className='my-3'>My Profile</h2>
            <Form onSubmit={handleFormSubmit} className='border my-2'>
              {/* name  */}
              <FormGroup controlId='name' className='m-2 p-3 border'>
                <FormLabel>Name</FormLabel>
                <FormControl
                  type='name'
                  placeholder='Enter Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></FormControl>
              </FormGroup>

              {/* email  */}
              <FormGroup controlId='email' className='m-2 p-3 border'>
                <FormLabel>Email</FormLabel>
                <FormControl
                  type='email'
                  placeholder='Enter Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></FormControl>
              </FormGroup>

              {/* password  */}
              <FormGroup controlId='password' className='m-2 p-3 border'>
                <FormLabel>Password</FormLabel>
                <FormControl
                  type='password'
                  placeholder='Enter Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></FormControl>
              </FormGroup>

              {/* confirm password  */}
              <FormGroup controlId='confirmPassword' className='m-2 p-3 border'>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl
                  type='password'
                  placeholder='Confirm Password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></FormControl>
              </FormGroup>

              <Button variant='primary' type='submit' className='mt-2 d-block'>
                Submit
              </Button>
            </Form>
          </Col>
          <Col md={9}>
            <h2 className='mt-3 mb-1'>My Orders</h2>
            {isLoading ? (
              <SpinnerLoader />
            ) : error ? (
              <Message variant='danger'>{error?.data?.message}</Message>
            ) : (
              <Table striped hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th>DETAILS</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    return (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>${order.totalPrice}</td>
                        <td>
                          {order.isPaid ? (
                            <p className='text-success'>{`PAID ON: ${order.paidAt.substring(
                              0,
                              10
                            )}`}</p>
                          ) : (
                            <p className='text-danger'>ORDER IS NOT PAID</p>
                          )}
                        </td>
                        <td>
                          {order.isDelivered ? (
                            <p className='text-success'>YES</p>
                          ) : (
                            <p className='text-danger'>NO</p>
                          )}
                        </td>
                        <td>
                          <Link to={`/order/${order._id}`}>Details</Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfilePage;
