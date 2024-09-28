import { useSelector } from "react-redux";
import CartItem from "../CartItem/CartItem";
import { RootState } from "@store/store";
import Loading from "@components/feedback/Loading/Loading";
const CartItemsList = () => {
  const { loading, error, productFullInfo, items } = useSelector(
    (state: RootState) => state.CartSlice
  );

  const products = productFullInfo.map((product) => ({
    ...product,
    quantity: items[product.id],
  }));
  return (
    <Loading loading={loading} error={error} type="cart">
      <div>
        {products.map((el, index) => (
          <div key={index}>
            <CartItem products={el} /> <hr className="my-4" />
          </div>
        ))}
      </div>
    </Loading>
  );
};

export default CartItemsList;
