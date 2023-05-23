import { Col } from 'react-bootstrap';
import ShowProduct from './ShowProduct';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/products.js';

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
    return 'loading...';
  } else if (isError) {
    return `Error: ${error.message}`;
  }

  // Axios retuns an object. Access the data property from it.
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
