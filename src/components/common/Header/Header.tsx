import { Navbar, Nav, Container, NavLink } from "react-bootstrap";
import HeaderBasket from "@components/ecommerce/HeaderBasket/HeaderBasket";
import { NavLink as navLinkRouter } from "react-router-dom";
import styles from "./styles.module.css";
import WishListHeader from "@components/ecommerce/WishListHeader/WishListHeader";
import logo from "@assets/logo3.png";
const Header = () => {
  const { navbarHeader, headerLink, mainNav, toggelerNavBar } = styles;
  return (
    <header>
      <div>
        <Navbar
          expand="lg"
          className="bg-body-white navbarHeader py-2 border-bottom"
        >
          <Container className={`${navbarHeader}  ${mainNav}`}>
            <div className={`d-flex align-items-center `}>
              <img src={logo} alt="logo" style={{ width: "130px" }} />
            </div>
            <Navbar.Toggle
              className="border-0 outline-none shadow-none order-4"
              aria-controls="basic-navbar-nav"
            />
            <Navbar.Collapse
              className={`${toggelerNavBar}`}
              id="basic-navbar-nav"
            >
              <Nav className="m-auto d-flex">
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
