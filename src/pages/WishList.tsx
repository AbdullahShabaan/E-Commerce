import { GridList, Heading } from "@components/common";
import Product from "@components/ecommerce/Product/Product";
import Loading from "@components/feedback/Loading/Loading";
import { useWishlist } from "@hooks/useWishlist";
import { Container } from "react-bootstrap";

const WishList = () => {
  const { fullDataInfo, loading, error } = useWishlist();
  return (
    <>
      <Heading title="Your WishList" />
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
