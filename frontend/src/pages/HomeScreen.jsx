import { Container, Row } from 'react-bootstrap';
import Products from '../components/Products';
import Meta from '../components/Meta';

function HomeScreen() {
  return (
    <>
      <Container>
        <main className='pt-3'>
          <Meta />
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
