import { Card } from 'react-bootstrap';
import Ratings from './Ratings';

function ShowProduct({ product }) {
  return (
    <Card className='my-3 p-3 rounded'>
      <a href={`/product/${product._id}`}>
        <Card.Img variant='top' src={product.image} />
      </a>
      <Card.Body>
        {/* Title */}
        <Card.Title as='div'>
          <h5>
            <a href={`/product/${product._id}`}>{product.name}</a>
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
