import Spinner from "react-bootstrap/Spinner";

const LoadingSpinner = () => (
  <div className="loading-overlay">
    <Spinner animation="border" variant="light" />
  </div>
);

export default LoadingSpinner;
