import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Button,
  ListGroup,
  ListGroupItem,
  Form,
} from 'react-bootstrap';
import Ratings from '../components/Ratings';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SpinnerLoader from '../components/SpinnerLoader';
import Message from '../components/Message';
import { useGetProductDetailsQuery } from '../store/slices/productsApiSlice';

function ProductPage() {
  // state to track the quantity
  const [quantity, setQuantity] = useState(1);

  // get the parameter passed from thr path in the App component.
  const { id: productId } = useParams();

  // navigation (could also use Link instead).
  const navigate = useNavigate();

  // Redux toolkit (fetch products by ID)
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductDetailsQuery(productId);

  if (isLoading) {
    return <SpinnerLoader />;
  } else if (isError) {
    return <Message variant='danger'>Error: {error.error}</Message>;
  }

  const handleAddToCart = () => {
    navigate(`/cart/${productId}/qty=${quantity}`);
  };

  return (
    <>
      <Container>
        <Button className='my-3' onClick={() => navigate('/')}>
          Go Back
        </Button>

        <Row>
          <Col lg={6}>
            <ListGroup>
              <ListGroupItem>
                <Image src={product.image} alt={product.description} fluid />
              </ListGroupItem>
              <ListGroupItem>
                <h2>{product.name}</h2>
              </ListGroupItem>
              <ListGroupItem>{product.description}</ListGroupItem>
            </ListGroup>
          </Col>

          <Col lg={6}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <Row>
                    <Col>Price</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroupItem>

                <ListGroupItem>
                  <Row>
                    <Col>Status</Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroupItem>

                <ListGroupItem>
                  <Row>
                    <Col>Reviews</Col>
                    <Col>
                      {' '}
                      <Ratings value={product.rating} />
                    </Col>
                  </Row>
                </ListGroupItem>

                {product.countInStock > 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col>Quantity</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          size='sm'
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        >
                          <option>Select Quantity</option>
                          {Array.from(Array(product.countInStock).keys()).map(
                            (num) => {
                              return (
                                <option key={num + 1} value={num + 1}>
                                  {num + 1}
                                </option>
                              );
                            }
                          )}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroupItem>
                )}

                <ListGroupItem>
                  <Row>
                    <Button
                      disabled={product.countInStock === 0}
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </Button>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProductPage;
