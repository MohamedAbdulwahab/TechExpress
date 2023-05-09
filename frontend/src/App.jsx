import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './pages/HomeScreen';
import ErrorPage from './pages/ErrorPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/login' element={<ErrorPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
