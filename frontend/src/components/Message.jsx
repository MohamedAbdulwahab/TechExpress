import { Alert, Container } from 'react-bootstrap';

function Message({ variant, children }) {
  return (
    <Container>
      <Alert variant={variant}>{children}</Alert>
    </Container>
  );
}

Message.defaultProps = {
  variant: 'info',
};

export default Message;
