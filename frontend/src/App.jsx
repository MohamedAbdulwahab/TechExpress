import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import HomeScreen from './pages/HomeScreen';

function App() {
  return (
    <>
      <Header />
      <Container>
        <main className='py-3'>
          <HomeScreen />
        </main>
      </Container>
      <Footer />
    </>
  );
}

export default App;
