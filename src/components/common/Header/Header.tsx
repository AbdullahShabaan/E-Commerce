import { Navbar, Nav, Container, NavLink } from "react-bootstrap";
import HeaderBasket from "@components/ecommerce/HeaderBasket/HeaderBasket";
import { NavLink as navLinkRouter } from "react-router-dom";
import styles from "./styles.module.css";
import WishListHeader from "@components/ecommerce/WishListHeader/WishListHeader";
import logo from "@assets/logo3.png";
import loaderAnimation from "../../../assets/loader.json";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
const Header = () => {
  const { navbarHeader, headerLink, mainNav, toggelerNavBar } = styles;
  const [isScroll, setIsScroll] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 150) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header>
      <div>
        <Navbar
          style={{ transition: "0.8s top", top: "-50px", position: "static" }}
          expand="lg"
          className={`bg-body-white navbarHeader py-2 border-bottom  ${
            isScroll
              ? "position-fixed start-0 end-0 z-3 bg-white top-0 shadow-sm"
              : ""
          }`}
        >
          <Container className={`${navbarHeader}  ${mainNav}`}>
            <div className={`d-flex align-items-center `}>
              <img src={logo} alt="logo" style={{ width: "130px" }} />
            </div>
            <Navbar.Toggle
              className="border-0 outline-none shadow-none order-4"
              aria-controls="basic-navbar-nav"
            />
            <Lottie
              style={{ width: "100px" }}
              animationData={loaderAnimation}
              loop={false}
            />
            <Navbar.Collapse
              className={`${toggelerNavBar}`}
              id="basic-navbar-nav"
            >
              <Nav className="ms-3 d-flex">
                <NavLink className={headerLink} as={navLinkRouter} to="./home">
                  Home
                </NavLink>
                <NavLink
                  className={headerLink}
                  as={navLinkRouter}
                  to="./categories"
                >
                  Categories
                </NavLink>
                <NavLink
                  className={headerLink}
                  as={navLinkRouter}
                  to="./aboutsUs"
                >
                  About Us
                </NavLink>
                <NavLink as={navLinkRouter} to="./register">
                  Register
                </NavLink>
                <NavLink className={headerLink} as={navLinkRouter} to="./login">
                  Login
                </NavLink>
              </Nav>
            </Navbar.Collapse>

            <div className="d-flex align-items-center py-3">
              <WishListHeader />
              <HeaderBasket />
            </div>
          </Container>
        </Navbar>
      </div>
    </header>
  );
};

export default Header;
