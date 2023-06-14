import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Container,
  ListGroupItem,
  Spinner,
} from 'react-bootstrap';
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useDeliverOrderMutation,
} from '../store/slices/ordersApiSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { Link, useParams } from 'react-router-dom';
import Message from '../components/Message';
import SpinnerLoader from '../components/SpinnerLoader';

const OrderPage = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    isError,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [deliveerOrder, { isLoading: loadingDeliver, error: deliverError }] =
    useDeliverOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  const { userInfo } = useSelector((state) => state.login);

  // from PayPal documentations.
  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success('Order has been paid');
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    });
  };

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const onError = (err) => {
    toast.error(err.message);
  };

  const handleDeliverOrder = () => {
    try {
      deliveerOrder(orderId);
      refetch();
      toast.success('Order Delivered');
    } catch (error) {
      toast.error(deliverError);
    }
  };

  const content = isLoading ? (
    <SpinnerLoader />
  ) : isError ? (
    <Message>{error}</Message>
  ) : (
    <Container>
      <h3 className='py-3'>Order #{order._id}</h3>
      <Row>
        {/* left side  */}
        <Col md={8}>
          {/* shipping information  */}
          <ListGroup>
            <h3>Shipping Information</h3>
            {/* name  */}
            <ListGroupItem>
              <strong>Name:</strong> {order.user.name}
            </ListGroupItem>

            {/* email  */}
            <ListGroupItem>
              <strong>Email:</strong> {order.user.email}
            </ListGroupItem>

            {/* address  */}
            <ListGroupItem>
              <strong>Address:</strong> {order.shippingAddress.address},{' '}
              {order.shippingAddress.city}, {order.shippingAddress.postalCode},{' '}
              {order.shippingAddress.country}.
            </ListGroupItem>

            {/* delivery status  */}
            <ListGroupItem>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on: {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='warning'>
                  Order has not been delivered
                </Message>
              )}
            </ListGroupItem>
          </ListGroup>

          {/* payment information  */}
          <ListGroup className='mt-4'>
            <h3>Payment Information</h3>

            {/* payment method  */}
            <ListGroupItem>
              <strong>Payment Method:</strong> {order.paymentMethod}
            </ListGroupItem>

            {/* payment status  */}
            <ListGroupItem>
              {order.isPaid ? (
                <Message variant='success'>Paid on: {order.paidAt}</Message>
              ) : (
                <Message variant='warning'>Order has not been paid</Message>
              )}
            </ListGroupItem>
          </ListGroup>

          {/* order items */}
          <ListGroup className='mt-4'>
            <h3>Order Items</h3>

            {order.orderItems.map((item) => {
              return (
                <ListGroupItem key={item._id}>
                  <Row>
                    <Col md={1}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fluid
                        rounded
                      ></Image>
                    </Col>
                    <Col className='pt-2'>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={4} className='pt-2'>
                      {item.price} x {item.quantity} = $
                      {(item.price * item.quantity).toFixed(2)}
                    </Col>
                  </Row>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </Col>

        {/* right side  */}
        <Col md={4}>
          <h3>Order Summary</h3>
          <ListGroup>
            <ListGroupItem>
              <Row>
                <Col>Subtotal: </Col>
                <Col>${order.itemsPrice.toFixed(2)}</Col>
              </Row>
            </ListGroupItem>

            <ListGroupItem>
              <Row>
                <Col>Shipping: </Col>
                <Col>${order.shippingPrice}</Col>
              </Row>
            </ListGroupItem>

            <ListGroupItem>
              <Row>
                <Col>Tax: </Col>
                <Col>${order.taxPrice}</Col>
              </Row>
            </ListGroupItem>

            <ListGroupItem>
              <Row>
                <Col>Total: </Col>
                <Col>${order.totalPrice}</Col>
              </Row>
            </ListGroupItem>

            {/* pay order */}
            {!order.isPaid && (
              <ListGroup.Item>
                {loadingPay && <SpinnerLoader />}

                {isPending ? (
                  <SpinnerLoader />
                ) : (
                  <div>
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    ></PayPalButtons>
                  </div>
                )}
              </ListGroup.Item>
            )}

            {/* mark as delivered (admin only) */}
            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <ListGroupItem>
                  <Row>
                    <Button
                      type='button'
                      disabled={loadingDeliver}
                      onClick={handleDeliverOrder}
                    >
                      {isLoading ? <Spinner /> : 'Mark as Delivered'}
                    </Button>
                  </Row>
                </ListGroupItem>
              )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );

  return <>{content}</>;
};

export default OrderPage;
