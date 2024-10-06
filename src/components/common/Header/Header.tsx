import { Navbar, Nav, Container, NavLink } from "react-bootstrap";
import HeaderBasket from "@components/ecommerce/HeaderBasket/HeaderBasket";
import { NavLink as navLinkRouter } from "react-router-dom";
import styles from "./styles.module.css";
import WishListHeader from "@components/ecommerce/WishListHeader/WishListHeader";
import logo from "@assets/logo3.png";
import loaderAnimation from "../../../assets/loader.json";
import Lottie from "lottie-react";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/store";
import { logOut } from "@store/Auth/AuthSlice";
const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { navbarHeader, headerLink, mainNav, toggelerNavBar } = styles;
  const { user, accessToken } = useSelector(
    (state: RootState) => state.AuthSlice
  );
  return (
    <header>
      <div>
        <Navbar
          expand="lg"
          className={`bg-body-white navbarHeader py-0 border-bottom position-fixed start-0 end-0 z-3 bg-white top-0 shadow-sm 
           `}
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

                {!accessToken ? (
                  <>
                    <NavLink
                      as={navLinkRouter}
                      className={headerLink}
                      to="./register"
                    >
                      Sign up
                    </NavLink>
                    <NavLink
                      className={headerLink}
                      as={navLinkRouter}
                      to="./login"
                    >
                      Sign In
                    </NavLink>
                  </>
                ) : (
                  <Dropdown>
                    <Dropdown.Toggle
                      style={{ borderColor: "white" }}
                      variant="none"
                    >
                      Welcome{" "}
                      <span className="text-capitalize">
                        {user.firstName} {user.lastName}
                      </span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item as={navLinkRouter} to="/profile">
                        Profile
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Another action
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        as={navLinkRouter}
                        to="./"
                        onClick={() => dispatch(logOut())}
                      >
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
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
