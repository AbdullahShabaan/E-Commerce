import { useEffect } from "react";
import Product from "@components/ecommerce/Product/Product";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/store";
import { GridList, Heading } from "@components/common";
import { useParams } from "react-router-dom";
import getProductsByCatPrefix from "@store/Products/act/actGetProductsByCatPrefix";
import { productsCleanUp } from "@store/Products/productsSlice";
import Loading from "@components/feedback/Loading/Loading";

const Products = () => {
  const selector = useSelector((state: RootState) => state.CartSlice.items);
  const wishlistItems = useSelector(
    (state: RootState) => state.WishListSlice.itemsId || []
  );

  const { prefix } = useParams();
  const { data, error, loading } = useSelector(
    (state: RootState) => state.productsSlice
  );
  const fullDataInfo = data.map((d) => ({
    ...d,
    quantity: selector[d.id] ?? 0,
    isLiked: wishlistItems.includes(d.id),
  }));
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const cat = prefix as string;
    dispatch(getProductsByCatPrefix(cat));

    return () => {
      dispatch(productsCleanUp());
    };
  }, [dispatch, prefix]);

  return (
    <div>
      <Heading>
        <span className="text-capitalize">{prefix} Products</span>
      </Heading>
      <Container>
        <Loading loading={loading} error={error}>
          <GridList
            message="there is no products available!"
            data={fullDataInfo}
            iteration={(record) => <Product {...record} />}
          />
        </Loading>
      </Container>
    </div>
  );
};

export default Products;
