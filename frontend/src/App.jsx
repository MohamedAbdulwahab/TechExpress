import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './pages/HomeScreen';
import ErrorPage from './pages/ErrorPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/cart' element={<ErrorPage />} />
          <Route path='/login' element={<ErrorPage />} />
          <Route path='/product/:userId' element={<ProductPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
