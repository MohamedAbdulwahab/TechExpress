import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './pages/HomeScreen';
import ErrorPage from './pages/ErrorPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PaymentPage from './pages/PaymentPage';
import ShippingPage from './pages/ShippingPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import PrivateRoute from './components/PrivateRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          {/* public Routes  */}
          <Route path='/' element={<HomeScreen />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='*' element={<ErrorPage />} />

          {/* private/protected routes  */}
          <Route path='' element={<PrivateRoute />}>
            <Route path='/shipping' element={<ShippingPage />} />
            <Route path='/payment' element={<PaymentPage />} />
            <Route path='/placeorder' element={<PlaceOrderPage />} />
          </Route>
        </Routes>
      </main>
      <Footer />
      <ToastContainer />
    </Router>
  );
}

export default App;
