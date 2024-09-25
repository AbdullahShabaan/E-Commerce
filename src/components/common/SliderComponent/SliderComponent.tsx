import Product from "@components/ecommerce/Product/Product";
import Slider from "react-slick";
import { TProducts } from "src/types/TProducts";

function SliderProducts(data: { fullDataInfo: TProducts[] }) {
  const settings = {
    ButtonToolbar: false,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
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

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {data.fullDataInfo.map((data, index) => (
          <div key={index}>
            <Product {...data} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SliderProducts;
