import { Row } from 'react-bootstrap';
import Products from '../components/Products';

function HomeScreen() {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        <Products />
      </Row>
    </>
  );
}

export default HomeScreen;
