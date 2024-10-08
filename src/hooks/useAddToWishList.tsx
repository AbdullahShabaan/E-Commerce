import { AppDispatch } from "@store/store";
import wishListToggle from "@store/Wishlist/act/actWishListToggle";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

type TProp = {
  likeLoading: boolean;
  setLikeLoading: React.Dispatch<React.SetStateAction<boolean>>;
  accessToken: string | null;
  id: number;
};

const useAddToWishList = ({
  likeLoading,
  setLikeLoading,
  accessToken,
  id,
}: TProp) => {
  const dispatch = useDispatch<AppDispatch>();

  const wishlistToggleHandler = () => {
    if (likeLoading) {
      return;
    }
    setLikeLoading(true);
    if (accessToken) {
      dispatch(wishListToggle(id))
        .unwrap()
        .then(() => setLikeLoading(false))
        .catch(() => setLikeLoading(false));
    } else {
      toast.error("Please login to add to wishlist");
      setLikeLoading(false);
    }
  };
  return wishlistToggleHandler;
};

export default useAddToWishList;
