import { Card } from 'react-bootstrap';
import Ratings from './Ratings';
import { Link } from 'react-router-dom';

function ShowProduct({ product }) {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img variant='top' src={product.image} fluid='true' />
      </Link>
      <Card.Body>
        {/* Title */}
        <Card.Title as='div'>
          <h5>
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </h5>
        </Card.Title>

        {/* Rating  */}
        <Card.Text as='div'>
          <p className='my-2'>
            <Ratings
              value={product.rating}
              text={`from ${product.numReviews} reviews`}
              color='black'
            />
          </p>
        </Card.Text>

        {/* Price */}
        <Card.Text as='h4' className='pt-2'>
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ShowProduct;
