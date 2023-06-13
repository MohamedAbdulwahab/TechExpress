import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const AdminRoute = () => {
  // logged in user information is stored in userInfo.
  const { userInfo } = useSelector((state) => state.login);

  // check if the user is logged in and has is Admin access.
  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to='/login' replace />
  );
};

export default AdminRoute;
