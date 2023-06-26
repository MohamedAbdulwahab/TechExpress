import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import Message from '../../components/Message';
import SpinnerLoader from '../../components/SpinnerLoader';
import { toast } from 'react-toastify';
import { Image } from 'cloudinary-react';
import {
  useGetProductDetailsQuery,
  useUpdateProductByIdMutation,
  useUpdateProductImageMutation,
} from '../../store/slices/productsApiSlice';

const ProductEditPage = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductDetailsQuery(productId);

  // use cloudinary to update product image
  const [updateProductImage, { isLoading: loadingImageUpdate }] =
    useUpdateProductImageMutation();

  const [
    updateProduct,
    {
      isLoading: LoadingProductUpdate,
      isError: productUpdateIsError,
      error: productsUpdateError,
    },
  ] = useUpdateProductByIdMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    updateProduct({
      _id: productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    });

    if (productUpdateIsError) {
      toast.error(productsUpdateError);
    } else {
      toast.success('Product updated');
      navigate('/admin/productlist');
    }
  };

  const handleFileUpload = async (e) => {
    // create the form data instance.
    const formData = new FormData();

    // append the image object to the fromData instance [name must be: 'file'].
    formData.append('file', e.target.files[0]);

    // append cloudinary upload present
    formData.append('upload_preset', 'u7mpkl7y');

    try {
      // upload image to cloudinary storage and save the response.
      const res = await updateProductImage(formData);

      if (res.data) {
        // show a success message.
        toast.success('Image updated successfully');
      }

      // update the image url.
      setImage(res.data.secure_url);
    } catch (err) {
      toast.error(err?.data?.message || err.error || 'Error updating image');
    }
  };

  return (
    <>
      <Container>
        <Link to='/admin/productlist' className='btn btn-primary mt-3 mb-4'>
          GO BACK
        </Link>

        <FormContainer>
          <h3 className='pb-2'>Edit Product</h3>
          {LoadingProductUpdate && <SpinnerLoader />}
          {isLoading ? (
            <SpinnerLoader />
          ) : isError ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Form onSubmit={handleFormSubmit}>
              {/* name */}
              <Form.Group className='mb-3' controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              {/* price */}
              <Form.Group className='mb-3' controlId='price'>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter Price'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>

              {/* image */}
              <Form.Group className='mb-3' controlId='image'>
                <Row>
                  <Col>
                    <Form.Label>Image</Form.Label>
                  </Col>
                  <Col>
                    {loadingImageUpdate && (
                      <div className='d-flex justify-content-end mb-1'>
                        <Spinner animation='grow' variant='primary' />
                        <Spinner animation='grow' variant='primary' />
                        <Spinner animation='grow' variant='primary' />
                      </div>
                    )}
                  </Col>
                </Row>
                <Form.Control
                  type='text'
                  placeholder='Enter Image URL'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />

                <Form.Control
                  type='file'
                  label='Choose File'
                  onChange={handleFileUpload}
                />
              </Form.Group>

              {/* brand */}
              <Form.Group className='mb-3' controlId='brand'>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Brand'
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </Form.Group>

              {/* category */}
              <Form.Group className='mb-3' controlId='category'>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Category'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Group>

              {/* count in stock */}
              <Form.Group className='mb-3' controlId='countInStock'>
                <Form.Label>Count in Stock</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter Count In Stock'
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </Form.Group>

              {/* description */}
              <Form.Group className='mb-3' controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <Row>
                <Button type='submit'>Update</Button>
              </Row>
            </Form>
          )}
        </FormContainer>
      </Container>
    </>
  );
};

export default ProductEditPage;
