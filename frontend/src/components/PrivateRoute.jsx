import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  // logged in user information is stored in userInfo.
  const { userInfo } = useSelector((state) => state.login);

  // userInfo is present? <Outlet /> else redirect to login page.
  return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
};

export default PrivateRoute;
