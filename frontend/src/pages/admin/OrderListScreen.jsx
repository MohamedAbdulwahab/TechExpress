import SpinnerLoader from '../../components/SpinnerLoader';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useGetOrdersQuery } from '../../store/slices/ordersApiSlice';

const OrderListScreen = () => {
  const { data: allOrders, isLoading, isError, error } = useGetOrdersQuery();

  return (
    <>
      <Container>
        {isLoading ? (
          <SpinnerLoader />
        ) : isError ? (
          { error }
        ) : (
          <>
            <h3 className='pt-4 pb-3'>Orders</h3>
            {/* table head  */}
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th>DETAILS</th>
                </tr>
              </thead>

              {/* table body  */}
              <tbody>
                {allOrders.map((order) => {
                  return (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.user.name}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          <p className='text-success'>YES</p>
                        ) : (
                          <p className='text-danger'>NO</p>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          <p className='text-success'>YES</p>
                        ) : (
                          <p className='text-danger'>NO</p>
                        )}
                      </td>
                      <td>
                        {
                          <Link
                            to={`/order/${order._id}`}
                            className='text-info'
                          >
                            Details
                          </Link>
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </>
        )}
      </Container>
    </>
  );
};

export default OrderListScreen;
