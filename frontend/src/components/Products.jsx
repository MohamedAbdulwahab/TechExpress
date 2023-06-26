import { Row, Col, Container } from 'react-bootstrap';
import ShowProduct from './ShowProduct';
import Loader from './Loader';
import Message from './Message';
import Paginate from './Pagination';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../store/slices/productsApiSlice';

function Products() {
  const { pageNumber, keyword } = useParams();

  // Redux toolkit (fetch all products)
  const { data, isLoading, isError, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  if (isLoading) {
    return <Loader />;
  } else if (isError) {
    return <Message variant='danger'>Error: {error.message}</Message>;
  }

  const renderedProducts = data.products.map((product) => {
    return (
      <Col key={product._id} md={6} lg={4} xl={4}>
        <ShowProduct product={product} />
      </Col>
    );
  });

  return (
    <>
      <Row>{renderedProducts}</Row>
      <Row>
        <Col className='pagination-center pt-4'>
          <Paginate
            numberOfPages={data.numberOfPages}
            currentPage={data.pageNumber}
            keyword={keyword ? keyword : ''}
          />
        </Col>
      </Row>
    </>
  );
}

export default Products;
