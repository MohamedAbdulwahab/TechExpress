import { Col } from 'react-bootstrap';
import ShowProduct from './ShowProduct';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products/');

      setProducts(data);
    };

    fetchProducts();
  }, []);

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
