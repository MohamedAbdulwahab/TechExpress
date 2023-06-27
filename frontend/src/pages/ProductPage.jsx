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
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap';
import Ratings from '../components/Ratings';
import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SpinnerLoader from '../components/SpinnerLoader';
import Message from '../components/Message';
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from '../store/slices/productsApiSlice';
import { addToCart } from '../store/slices/cartSlice';
import Meta from '../components/Meta';

function ProductPage() {
  // state to track the quantity
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  // get logged-in user information
  const { userInfo } = useSelector((state) => state.login);

  // get the parameter passed from thr path in the App component.
  const { id: productId } = useParams();

  // dispatch
  const dispatch = useDispatch();

  // navigation (could also use Link instead).
  const navigate = useNavigate();

  // Redux toolkit query (fetch products by ID)
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductDetailsQuery(productId);

  // RTK Query
  const [createReview, { isLoading: loadingReviews, error: reviewError }] =
    useCreateReviewMutation();

  if (isLoading) {
    return <SpinnerLoader />;
  } else if (isError) {
    return <Message variant='danger'>Error: {error.error}</Message>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    navigate(`/cart`);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        _id: productId,
        submittedBy: userInfo._id,
        rating,
        comment,
      }).unwrap();
      toast.success('Review Submitted');
      setRating(0);
      setComment('');
    } catch (err) {
      toast.error(err?.data?.message || reviewError);
    }
  };

  return (
    <>
      <Meta title={product.name} />;
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

        <Row>
          <Col lg={6}>
            <div className='my-3 border'>
              <h3 className='py-2 ms-3'>Reviews</h3>
              {product.reviews.length === 0 && (
                <ListGroup className='mx-3'>
                  <Message className='py-5' variant='warning'>
                    This product has no reviews
                  </Message>
                </ListGroup>
              )}
              <ListGroup>
                {product.reviews.map((review) => {
                  return (
                    <ListGroupItem key={review._id} className='py-1 my-2 mx-2'>
                      <Row>
                        <Col sm={4} className='text-left mt-2'>
                          <p>{review.name}</p>
                        </Col>
                        <Col sm={4} className='text-center mt-2 '>
                          <p>{review.createdAt.substring(0, 10)}</p>
                        </Col>
                        <Col sm={4} className='text-end mt-2'>
                          <Ratings value={review.rating} />
                        </Col>
                        <hr />
                        <Col sm={12}>
                          <p>{review.comment}</p>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  );
                })}

                <ListGroupItem className='border-0'>
                  <h4>Write a Review</h4>
                  {loadingReviews && <SpinnerLoader />}
                  {userInfo ? (
                    <Form onSubmit={handleFormSubmit}>
                      {/* rating  */}
                      <FormGroup controlId='rating' className='py-2'>
                        <FormLabel>Rating</FormLabel>
                        <FormControl
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                        >
                          <option value='select'>Select</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </FormControl>
                      </FormGroup>

                      {/* comment  */}
                      <FormGroup controlId='comment' className='py-2'>
                        <FormLabel>Comment</FormLabel>
                        <FormControl
                          as='textarea'
                          rows='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></FormControl>
                      </FormGroup>

                      {/* submit  */}
                      <ListGroupItem className='border-0'>
                        <Row>
                          <Button
                            disabled={loadingReviews}
                            type='submit'
                            className='my-2'
                          >
                            Submit
                          </Button>
                        </Row>
                      </ListGroupItem>
                    </Form>
                  ) : (
                    <ListGroup>
                      <Message variant='warning'>
                        Please <Link to={'/login'}>Sign-In</Link> to write a
                        review
                      </Message>
                    </ListGroup>
                  )}
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProductPage;
