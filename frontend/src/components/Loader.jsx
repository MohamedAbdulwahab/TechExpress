import {
  Container,
  Row,
  Col,
  Card,
  Placeholder,
  Spinner,
} from 'react-bootstrap';

function Loader() {
  return (
    <>
      <Container>
        <Row>
          {/* Card One */}
          <Col md={6} lg={4} lx={3}>
            <Card className='my-3 p-3 rounded'>
              <Spinner
                as={Card.Img}
                role='status'
                variant='secondary'
                style={{
                  width: '230px',
                  height: '230px',
                  display: 'block',
                  margin: 'auto',
                }}
              ></Spinner>

              <Card.Body className='py-5'>
                {/* Title */}
                <Placeholder as={Card.Title} animation='glow' className='pb-3'>
                  <Placeholder xs={8} size='lg' />
                </Placeholder>
                <Placeholder as={Card.Text} animation='glow'>
                  <Placeholder xs={12} size='lg' />
                </Placeholder>
                <Placeholder as={Card.Text} animation='glow' className='pb-2'>
                  <Placeholder xs={12} size='lg' />
                </Placeholder>
              </Card.Body>
            </Card>
          </Col>

          {/* Card Two */}
          <Col md={6} lg={4} lx={3}>
            <Card className='my-3 p-3 rounded'>
              <Spinner
                as={Card.Img}
                role='status'
                variant='secondary'
                style={{
                  width: '230px',
                  height: '230px',
                  display: 'block',
                  margin: 'auto',
                }}
              ></Spinner>

              <Card.Body className='py-5'>
                {/* Title */}
                <Placeholder as={Card.Title} animation='glow' className='pb-3'>
                  <Placeholder xs={8} size='lg' />
                </Placeholder>
                <Placeholder as={Card.Text} animation='glow'>
                  <Placeholder xs={12} size='lg' />
                </Placeholder>
                <Placeholder as={Card.Text} animation='glow' className='pb-2'>
                  <Placeholder xs={12} size='lg' />
                </Placeholder>
              </Card.Body>
            </Card>
          </Col>

          {/* Card Three */}
          <Col md={6} lg={4} lx={3}>
            <Card className='my-3 p-3 rounded'>
              <Spinner
                as={Card.Img}
                role='status'
                variant='secondary'
                style={{
                  width: '230px',
                  height: '230px',
                  display: 'block',
                  margin: 'auto',
                }}
              ></Spinner>

              <Card.Body className='py-5'>
                {/* Title */}
                <Placeholder as={Card.Title} animation='glow' className='pb-3'>
                  <Placeholder xs={8} size='lg' />
                </Placeholder>
                <Placeholder as={Card.Text} animation='glow'>
                  <Placeholder xs={12} size='lg' />
                </Placeholder>
                <Placeholder as={Card.Text} animation='glow' className='pb-2'>
                  <Placeholder xs={12} size='lg' />
                </Placeholder>
              </Card.Body>
            </Card>
          </Col>

          {/* Card Four */}
          <Col md={6} lg={4} lx={3} className='d-none d-md-block'>
            <Card className='my-3 p-3 rounded'>
              <Spinner
                as={Card.Img}
                role='status'
                variant='secondary'
                style={{
                  width: '230px',
                  height: '230px',
                  display: 'block',
                  margin: 'auto',
                }}
              ></Spinner>

              <Card.Body className='py-5'>
                {/* Title */}
                <Placeholder as={Card.Title} animation='glow' className='pb-3'>
                  <Placeholder xs={8} size='lg' />
                </Placeholder>
                <Placeholder as={Card.Text} animation='glow'>
                  <Placeholder xs={12} size='lg' />
                </Placeholder>
                <Placeholder as={Card.Text} animation='glow' className='pb-2'>
                  <Placeholder xs={12} size='lg' />
                </Placeholder>
              </Card.Body>
            </Card>
          </Col>

          {/* Card Five */}
          <Col md={6} lg={4} lx={3} className='d-none d-md-block'>
            <Card className='my-3 p-3 rounded'>
              <Spinner
                as={Card.Img}
                role='status'
                variant='secondary'
                style={{
                  width: '230px',
                  height: '230px',
                  display: 'block',
                  margin: 'auto',
                }}
              ></Spinner>

              <Card.Body className='py-5'>
                {/* Title */}
                <Placeholder as={Card.Title} animation='glow' className='pb-3'>
                  <Placeholder xs={8} size='lg' />
                </Placeholder>
                <Placeholder as={Card.Text} animation='glow'>
                  <Placeholder xs={12} size='lg' />
                </Placeholder>
                <Placeholder as={Card.Text} animation='glow' className='pb-2'>
                  <Placeholder xs={12} size='lg' />
                </Placeholder>
              </Card.Body>
            </Card>
          </Col>

          {/* Card Six */}
          <Col md={6} lg={4} lx={3} className='d-none d-md-block'>
            <Card className='my-3 p-3 rounded'>
              <Spinner
                as={Card.Img}
                role='status'
                variant='secondary'
                style={{
                  width: '230px',
                  height: '230px',
                  display: 'block',
                  margin: 'auto',
                }}
              ></Spinner>

              <Card.Body className='py-5'>
                {/* Title */}
                <Placeholder as={Card.Title} animation='glow' className='pb-3'>
                  <Placeholder xs={8} size='lg' />
                </Placeholder>
                <Placeholder as={Card.Text} animation='glow'>
                  <Placeholder xs={12} size='lg' />
                </Placeholder>
                <Placeholder as={Card.Text} animation='glow' className='pb-2'>
                  <Placeholder xs={12} size='lg' />
                </Placeholder>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Loader;

{
  /* <Spinner animation='border' role='status'>
<span className='visually-hidden'>Loading...</span>
</Spinner> */
}
