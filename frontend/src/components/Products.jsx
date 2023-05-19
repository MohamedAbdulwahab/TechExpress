import { Col } from 'react-bootstrap';
import products from '../products';
import ShowProduct from './ShowProduct';

function Products() {
  const renderedProducts = products.map((product) => {
    return (
      <Col key={product._id} md={6} lg={4} lx={3}>
        <ShowProduct product={product} />
      </Col>
    );
  });

  return renderedProducts;
}

export default Products;
