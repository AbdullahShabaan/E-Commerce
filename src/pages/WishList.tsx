import { GridList, Heading } from "@components/common";
import Product from "@components/ecommerce/Product/Product";
import Loading from "@components/feedback/Loading/Loading";
import { useWishlist } from "@hooks/useWishlist";
import { Container } from "react-bootstrap";
import Lottie from "lottie-react";
import emptyAnimation from "../assets/empty.json";
const WishList = () => {
  const { fullDataInfo, loading, error } = useWishlist();
  return (
    <>
      <Heading title="Your WishList" />
      <Container>
        <Loading loading={loading} error={error} type="product">
          <GridList
            message="wishlist is Empty! Try to add some products!"
            data={fullDataInfo}
            iteration={(record) => <Product {...record} />}
          />
          {fullDataInfo.length == 0 && (
            <div className="d-flex justify-content-center">
              <Lottie
                style={{ width: "430px" }}
                animationData={emptyAnimation}
                loop={true}
              />
            </div>
          )}
        </Loading>
      </Container>
    </>
  );
};

export default WishList;
