import { Col } from 'react-bootstrap';
import ShowProduct from './ShowProduct';
import Loader from './Loader';
import Message from './Message';
import { useGetProductsQuery } from '../store/slices/productsApiSlice';

function Products() {
  // Redux toolkit (fetch all products)
  const { data: products, isLoading, isError, error } = useGetProductsQuery();

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
