import { Container, Row } from 'react-bootstrap';
import Products from '../components/Products';

function HomeScreen() {
  return (
    <>
      <Container>
        <main className='py-3'>
          <h1>Latest Products</h1>
          <Row>
            <Products />
          </Row>
        </main>
      </Container>
    </>
  );
}

export default HomeScreen;
