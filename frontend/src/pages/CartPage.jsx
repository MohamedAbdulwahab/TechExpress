import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  ListGroupItem,
} from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../store/slices/cartSlice';

function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // get the entire cart state.
  const cart = useSelector((state) => state.cart);

  // get cartItems from the cart state.
  const { cartItems } = cart;

  const handleAddToCart = async (product, quantity) => {
    dispatch(addToCart({ ...product, quantity }));
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
    if (cartItems.length === 0) {
      cart.shippingPrice = 0;
    }
  };

  const handleCheckOut = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <>
      <Container>
        <Row>
          <h1 className='py-3'>Shopping Cart</h1>
          <Col lg={8}>
            {cartItems.length === 0 ? (
              <div>
                <Message variant='warning'>Your cart is empty</Message>
                <Button className='my-3' onClick={() => navigate('/')}>
                  Shop Latest Products
                </Button>
              </div>
            ) : (
              <ListGroup>
                {cartItems.map((item) => {
                  return (
                    <ListGroupItem key={item._id} className='py-3'>
                      <Row>
                        {/* left column */}
                        <Col md={2}>
                          {/* image */}
                          <Col className='pb-2'>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            ></Image>
                          </Col>
                        </Col>

                        {/* right column */}
                        <Col md={10} className='py-xs-5 '>
                          <Row className='pb-3'>
                            {/* product name  */}
                            <Col xs={9} md={9}>
                              <Link to={`/product/${item._id}`}>
                                {`${item.name}`}
                              </Link>
                            </Col>

                            {/* product price  */}
                            <Col xs={3} md={3}>
                              ${item.price}
                            </Col>
                          </Row>

                          <Row>
                            {/* quantity selector  */}
                            <Col xs={9} md={9}>
                              <Form.Control
                                as='select'
                                size='sm'
                                value={item.quantity}
                                onChange={(e) => {
                                  // pass the item (product) and the quantity (e.target.value)
                                  handleAddToCart(item, Number(e.target.value));
                                }}
                              >
                                {Array.from(
                                  Array(item.countInStock).keys()
                                ).map((num) => {
                                  return (
                                    <option key={num + 1} value={num + 1}>
                                      {num + 1}
                                    </option>
                                  );
                                })}
                              </Form.Control>
                            </Col>

                            {/* remove product  */}
                            <Col xs={3} md={3}>
                              <Button
                                type='button'
                                variant='light'
                                onClick={() => handleRemoveFromCart(item._id)}
                              >
                                <i
                                  className='fa fa-trash'
                                  aria-hidden='true'
                                ></i>
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
            )}
          </Col>

          <Col lg={4}>
            <ListGroup>
              <ListGroupItem className='d-none d-lg-block'>
                <h4>
                  Items in Cart:{' '}
                  {cartItems.reduce((acc, item) => {
                    return acc + Number(item.quantity);
                  }, 0)}{' '}
                </h4>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Subtotal:</Col>
                  <Col>
                    $
                    {cartItems
                      .reduce((acc, item) => {
                        return acc + Number(item.quantity) * Number(item.price);
                      }, 0)
                      .toFixed(2)}
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping:</Col>
                  <Col> ${cart.shippingPrice || (0).toFixed(2)}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${cart.taxPrice || (0).toFixed(2)}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total:</Col>
                  <Col>${cart.totalPrice || (0).toFixed(2)}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Button
                    type='button'
                    className='btn-block'
                    disabled={cartItems.length === 0}
                    onClick={handleCheckOut}
                  >
                    Check Out
                  </Button>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CartPage;
