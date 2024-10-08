import Slider from "react-slick";
import Product from "../Product/Product";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/store";
import { useEffect } from "react";
import getProductsByCatPrefix from "@store/Products/act/actGetProductsByCatPrefix";
import { productsCleanUp } from "@store/Products/productsSlice";

function RelatedProducts({ category }: { category: string | undefined }) {
  const { data } = useSelector((state: RootState) => state.productsSlice);
  const settings = {
    ButtonToolbar: false,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: data.length,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getProductsByCatPrefix(category ?? ""));

    return () => {
      dispatch(productsCleanUp());
    };
  }, [dispatch, category]);

  return (
    <div className="slider-container mt-5">
      <Slider {...settings}>
        {data?.map((data, index) => (
          <div key={index} className="d-flex justify-content-center">
            <Product
              id={data.id}
              images={data.images}
              img={data.img}
              max={data.max}
              price={data.price}
              title={data.title}
              cat_prefix={data.cat_prefix}
              isLiked={data.isLiked}
              quantity={data.quantity}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default RelatedProducts;
