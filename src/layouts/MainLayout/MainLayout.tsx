import { Container } from "react-bootstrap";
import styles from "./styles.module.css";
import { Header, Footer } from "@components/common";
import { Outlet } from "react-router-dom";
import TopHeader from "@components/common/TopHeader/TopHeader";

const MainLayout = () => {
  const { container } = styles;

  return (
    <>
      <TopHeader />
      <Container className={container}>
        <Header />
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

export default MainLayout;
