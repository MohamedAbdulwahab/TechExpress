import { Col } from 'react-bootstrap';
import ShowProduct from './ShowProduct';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/products.js';
import Loader from './Loader';
import Message from './Message';

function Products() {
  // React Query (fetch data)
  const {
    isLoading,
    isError,
    data: products,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <Loader />;
  } else if (isError) {
    return <Message variant='danger'>Error: {error.message}</Message>;
  }

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
