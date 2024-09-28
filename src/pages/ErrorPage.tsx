import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import Lottie from "lottie-react";
import Error404 from "../assets/Error404-2.json";
const ErrorPage = () => {
  return (
    <Container className="notFound d-flex  flex-column align-items-center">
      <Lottie animationData={Error404} loop={true} style={{ width: "400px" }} />
      <Link to="/" replace={true}>
        How about going back to safety?
      </Link>
    </Container>
  );
};

export default ErrorPage;
