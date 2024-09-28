import {
  addToCart,
  removeFromCart,
  removeProductFromCart,
} from "@store/Cart/CartSlice";
import { AppDispatch } from "@store/store";
import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { TProducts } from "src/types/TProducts";
import toast from "react-hot-toast";

const CartItem = memo(({ products }: { products: TProducts }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { id, img, max, price, title, cat_prefix, quantity } = products;
  const [counter, setCounter] = useState(quantity ?? 0);
  const [minusDisabled, setMinusDisabled] = useState(counter == 1);
  const [plusDisabled, setPlusDisabled] = useState(counter == max);

  const changeCounterHandelerPlus = () => {
    if (!(counter == max)) {
      setCounter((counter) => counter + 1);
      dispatch(addToCart(id));
      toast.success(`Quantity updated successfully.`);
    }
  };
  const changeCounterHandelerMinus = () => {
    if (!(counter == 1)) {
      setCounter((counter) => counter - 1);
      dispatch(removeFromCart(id));
      toast.success(`Quantity updated successfully.`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 1 || Number(e.target.value) > max) {
      toast.error(`Maximum quantity allowed is ${max}.`);

      return;
    }
    setCounter(Number(e.target.value));
  };

  const handleDeleteProductFromCart = () => {
    dispatch(removeProductFromCart(id));
  };

  useEffect(() => {
    setPlusDisabled(counter == max);
    setMinusDisabled(counter == 1);
  }, [counter, max]);

  return (
    <div className="row mb-4 d-flex justify-content-between align-items-center mt-5">
      <div className="col-md-2 col-lg-2 col-xl-2 mt-4">
        <img src={img} className="img-fluid rounded-3" alt={title} />
      </div>
      <div className="col-md-3 col-lg-3 col-xl-3 py-3">
        <h6 className="text-muted">{title}</h6>
        <h6 className="mb-0">
          <span className="text-black-50">Category</span>: {cat_prefix}
        </h6>
        <h6 className="mb-0 py-2">
          <span className="text-black-50">Quantity</span>: {quantity}
        </h6>
      </div>
      <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
        <button
          disabled={minusDisabled}
          data-mdb-button-init=""
          data-mdb-ripple-init=""
          className="btn btn-link px-2"
          onClick={changeCounterHandelerMinus}
        >
          <i className="fas fa-minus" />
        </button>
        <input
          value={counter}
          onChange={handleChange}
          id="form1"
          name="quantity"
          type="text"
          className="form-control form-control-sm w-100 p-0 text-center"
        />
        <button
          disabled={plusDisabled}
          data-mdb-button-init=""
          data-mdb-ripple-init=""
          className="btn btn-link px-2"
          onClick={changeCounterHandelerPlus}
        >
          <i className="fas fa-plus" />
        </button>
      </div>
      <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1 m">
        <h6 className="mb-0">$ {(price * counter).toLocaleString()}</h6>
      </div>

      <div
        className="col-md-1 col-lg-1 col-xl-1 text-end btnDelete"
        style={{ cursor: "pointer" }}
        onClick={handleDeleteProductFromCart}
      >
        <span className="text-muted">
          <i className="fas fa-times" />
        </span>
      </div>
    </div>
  );
});

export default CartItem;
