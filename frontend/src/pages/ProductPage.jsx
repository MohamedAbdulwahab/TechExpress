import products from '../products';
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Button,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Ratings from '../components/Ratings';
import { useParams, useNavigate } from 'react-router-dom';

function ProductPage() {
  // get the parameter passed from thr path in the App component.
  const { userId } = useParams();

  // navigation (could also use Link instead).
  const navigate = useNavigate();

  // find the exact product.
  const product = products.find((product) => {
    return product._id === userId;
  });

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

                <ListGroupItem>
                  <Row>
                    <Button disabled={product.countInStock === 0}>
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
