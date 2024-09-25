import { Heading } from "@components/common";
import CartItemsList from "@components/ecommerce/CartItemsList/CartItemsList";
import TotalPrice from "@components/ecommerce/TotalPrice/TotalPrice";
import getProductsByItems from "@store/Cart/act/getProductsByItems";
import { cleanUpCartProducts } from "@store/Cart/CartSlice";
import { AppDispatch, RootState } from "@store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const { items } = useSelector((state: RootState) => state.CartSlice);
  const itemsLength =
    Object.values(items).length > 0
      ? Object.values(items).reduce((prev, curr) => prev + curr)
      : 0;
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getProductsByItems());

    return () => {
      dispatch(cleanUpCartProducts());
    };
  }, [dispatch]);
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
                        {itemsLength > 0 ? (
                          <CartItemsList />
                        ) : (
                          <p>Your cart is empty. Try adding items!</p>
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
                    <TotalPrice />
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
