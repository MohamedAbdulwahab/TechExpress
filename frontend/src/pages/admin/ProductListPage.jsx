import { Container, Row, Col, Button, Table, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import SpinnerLoader from '../../components/SpinnerLoader';
import Message from '../../components/Message';
import { toast } from 'react-toastify';
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductByIdMutation,
} from '../../store/slices/productsApiSlice';

const ProductListPage = () => {
  const {
    data: products,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetProductsQuery();

  const [createProduct, { isLoading: loadingCreateProduct }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDeleteProduct }] =
    useDeleteProductByIdMutation();

  const handleCreateProduct = async () => {
    try {
      await createProduct();
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleProductDelete = async (id) => {
    try {
      await deleteProduct(id);
      toast.success('Product Deleted');
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Container className='py-3'>
        <Row className='align-items-center justify-content-center'>
          <Col>
            <h3>Products</h3>
          </Col>
          <Col className='text-end'>
            <Button
              disabled={loadingCreateProduct}
              className='btn-sm m-3'
              onClick={handleCreateProduct}
            >
              {loadingCreateProduct ? <Spinner /> : 'Create Product'}
            </Button>
          </Col>
        </Row>

        {isLoading || loadingDeleteProduct ? (
          <SpinnerLoader />
        ) : isError ? (
          <Message>{error}</Message>
        ) : (
          <>
            <Table striped hover bordered responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th>EDIT</th>
                  <th>DELETE</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => {
                  return (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>
                        <Link to={`/admin/product/${product._id}/edit`}>
                          <Button variant='warning' className='btn-sm mx-1'>
                            <FaEdit />
                          </Button>
                        </Link>
                      </td>
                      <td>
                        <Button
                          variant='danger'
                          className='btn-sm mx-1'
                          onClick={() => handleProductDelete(product._id)}
                        >
                          <FaTrash />
                        </Button>
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

export default ProductListPage;
