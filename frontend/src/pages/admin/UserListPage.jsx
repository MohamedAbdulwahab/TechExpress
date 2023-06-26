import SpinnerLoader from '../../components/SpinnerLoader';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from '../../store/slices/usersApiSlice';

const UserListPage = () => {
  const {
    data: users,
    isLoading,
    refetch,
    isError,
    error,
  } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();

  const handleUserDelete = async (userId) => {
    window.confirm('Are you sure you want to delete this user?');

    try {
      await deleteUser(userId);
      refetch();
      toast.success('User Deleted');
    } catch (err) {
      toast.error(error?.data?.message || err.error);
    }
  };

  return (
    <>
      <Container>
        {isLoading ? (
          <SpinnerLoader />
        ) : isError ? (
          { error }
        ) : (
          <>
            <h3 className='pt-4 pb-3'>Users</h3>
            {/* table head  */}
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USERNAME</th>
                  <th>EMAIL</th>
                  <td>ADMIN</td>
                  <td></td>
                  <td></td>
                </tr>
              </thead>

              {/* table body  */}
              <tbody>
                {users.map((user) => {
                  return (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                      </td>
                      <td>
                        {user.isAdmin ? (
                          <p className='p-0 m-0 text-success'>YES</p>
                        ) : (
                          <p className='p-0 m-0 text-danger'>NO</p>
                        )}
                      </td>
                      <td className='text-center'>
                        <Link to={`/admin/user/${user._id}/edit`}>
                          <FaEdit className='ms-2' />
                        </Link>
                      </td>
                      <td className='text-center'>
                        <FaTrash
                          className='ms-2'
                          onClick={() => handleUserDelete(user._id)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </>
        )}
      </Container>
    </>
  );
};

export default UserListPage;
