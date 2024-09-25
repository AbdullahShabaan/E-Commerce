import photo from "@assets/Frame 560.png";
import SliderProducts from "@components/common/SliderComponent/SliderComponent";
import TitleSection from "@components/common/TitleSection/TitleSection";
import getAllProducts from "@store/Products/act/actGetAllProducts";
import { productsCleanUp } from "@store/Products/productsSlice";
import { AppDispatch, RootState } from "@store/store";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { data } = useSelector((state: RootState) => state.productsSlice);
  const selector = useSelector((state: RootState) => state.CartSlice.items);
  const wishlistItems = useSelector(
    (state: RootState) => state.WishListSlice?.itemsId || []
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllProducts());

    return () => {
      dispatch(productsCleanUp());
    };
  }, [dispatch]);

  const fullDataInfo = data.map((d) => ({
    ...d,
    quantity: selector[d.id] ?? 0,
    isLiked: wishlistItems.includes(d.id),
  }));

  return (
    <Container>
      <div className="row">
        <div className={`col-md-3 border-end mt-0 pt-4 catLinks`}>
          <ul className="list-unstyled categories-list">
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="col-md-9 pt-4">
          <img className="w-100" src={photo} alt="" />
        </div>
      </div>
      <TitleSection title="Recent Products">Today's</TitleSection>
      <div className="py-5">
        <SliderProducts fullDataInfo={fullDataInfo} />
        <Link
          to="products"
          className="d-flex mt-5"
          style={{ textDecoration: "none" }}
        >
          <button className="defaultBtn border-none mt-5 m-auto">
            view all products
          </button>
        </Link>
      </div>
    </Container>
  );
};

export default Home;
