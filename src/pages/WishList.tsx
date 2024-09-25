import { GridList, Heading } from "@components/common";
import Product from "@components/ecommerce/Product/Product";
import Loading from "@components/feedback/Loading/Loading";
import { AppDispatch, RootState } from "@store/store";
import getWishList from "@store/Wishlist/act/actGetWishList";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const WishList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { productsFullInfo, error, loading } = useSelector(
    (state: RootState) => state.WishListSlice
  );
  const selector = useSelector((state: RootState) => state.CartSlice.items);
  useEffect(() => {
    dispatch(getWishList());
  }, [dispatch]);

  const fullDataInfo = productsFullInfo.map((d) => ({
    ...d,
    quantity: selector[d.id] ?? 0,
    isLiked: true,
  }));

  return (
    <>
      <Heading>Your WishList</Heading>
      <Container>
        <Loading loading={loading} error={error}>
          <GridList
            message="wishlist is Empty!"
            data={fullDataInfo}
            iteration={(record) => <Product {...record} />}
          />
        </Loading>
      </Container>
    </>
  );
};

export default WishList;
