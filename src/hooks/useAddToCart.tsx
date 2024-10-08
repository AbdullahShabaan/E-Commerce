import { useDispatch } from "react-redux";
import { AppDispatch } from "@store/store";
import { addToCart } from "@store/Cart/CartSlice";
import toast from "react-hot-toast";

const useAddToCart = ({
  id,
  setIsDisabled,
}: {
  id: number;
  setIsDisabled: (value: boolean) => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const addToCartHandler = () => {
    dispatch(addToCart(id));
    setIsDisabled(true);
    toast.success("Added to cart successfully");
  };
  return addToCartHandler;
};

export default useAddToCart;
