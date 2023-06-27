import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Form, Button } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import Message from '../../components/Message';
import SpinnerLoader from '../../components/SpinnerLoader';
import { toast } from 'react-toastify';
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../store/slices/usersApiSlice';

const UserEditPage = () => {
  const { id: userId } = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState('false');

  const {
    data: user,
    isLoading: loadingUser,
    isError,
    error,
  } = useGetUserDetailsQuery(userId);

  const [
    updateUser,
    {
      isLoading: LoadingUserUpdate,
      isError: userIsError,
      error: userUpdateError,
    },
  ] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // update user
      await updateUser({
        _id: userId,
        name,
        email,
        isAdmin,
      });
      // show success message
      toast.success('User updated');
      // redirect to admin lsit page
      navigate('/admin/userlist');
    } catch (err) {
      // show error message
      toast.error(err?.data?.message || err.error || userUpdateError);
    }
  };

  return (
    <>
      <Container>
        <Link to='/admin/userlist' className='btn btn-primary mt-3 mb-4'>
          GO BACK
        </Link>

        <FormContainer>
          <h3 className='pb-2'>Edit User</h3>
          {loadingUser && <SpinnerLoader />}
          {loadingUser ? (
            <SpinnerLoader />
          ) : isError ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Form onSubmit={handleFormSubmit}>
              {/* name */}
              <Form.Group className='mb-3' controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              {/* email */}
              <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              {/* isAdmin */}
              <Form.Group className='mb-3' controlId='isAdmin'>
                <Form.Check
                  type='checkbox'
                  label='Admin User'
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.value)}
                />
              </Form.Group>

              <Row>
                <Button type='submit'>Update</Button>
              </Row>
            </Form>
          )}
        </FormContainer>
      </Container>
    </>
  );
};

export default UserEditPage;
