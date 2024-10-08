import { Heading } from "@components/common";
import CartItemsList from "@components/ecommerce/CartItemsList/CartItemsList";
import TotalPrice from "@components/ecommerce/TotalPrice/TotalPrice";
import { useCart } from "@hooks/useCart";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import emptyAnimation from "../assets/empty.json";
import orderDone from "../assets/orderDone.json";

const Cart = () => {
  const { itemsLength, accessToken, loading: orderLodaing } = useCart();
  return (
    <>
      <Heading title="Your Cart Items" />
      <section>
        <div className="pt-2 pb-5">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12">
              <div
                className="card card-registration card-registration-2"
                style={{ borderRadius: 15 }}
              >
                <div className="card-body p-0">
                  <div className="row g-0">
                    <div className="col-lg-8">
                      <div className="p-5">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                          <h1 className="fw-bold mb-0">Shopping Cart</h1>
                          <h6 className="mb-0 text-muted">
                            {itemsLength} items
                          </h6>
                        </div>
                        {orderLodaing == "succeeded" ? (
                          <Lottie
                            className="m-auto"
                            style={{ width: "430px" }}
                            animationData={orderDone}
                            loop={true}
                          />
                        ) : (
                          <>
                            {itemsLength > 0 ? (
                              <CartItemsList />
                            ) : (
                              <div className="d-flex align-items-center">
                                <p>
                                  Your cart is empty. Try adding some items!
                                </p>
                                <Lottie
                                  style={{ width: "430px" }}
                                  animationData={emptyAnimation}
                                  loop={true}
                                />
                              </div>
                            )}
                          </>
                        )}

                        <div className="pt-5">
                          <h6 className="mb-0">
                            <Link to="/" className="text-body">
                              <i className="fas fa-long-arrow-alt-left me-2" />
                              Back to shop
                            </Link>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <TotalPrice accessToken={accessToken} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
