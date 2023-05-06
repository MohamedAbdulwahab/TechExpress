import { Spinner } from 'react-bootstrap';

const SpinnerLoader = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
      }}
    >
      <Spinner
        animation='border'
        role='status'
        style={{
          width: '200px',
          height: '200px',
        }}
      />
    </div>
  );
};

export default SpinnerLoader;
