import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import getProductDetails from "@store/Products/act/actGetProductDetails";
import { AppDispatch, RootState } from "@store/store";
import { useParams } from "react-router-dom";
import useAddToCart from "@hooks/useAddToCart";
import useAddToWishList from "@hooks/useAddToWishList";
import RelatedProducts from "@components/ecommerce/RelatedProducts/RelatedProducts";
import TitleSection from "@components/common/TitleSection/TitleSection";

const ProductDetails = () => {
  const { id } = useParams();
  const [isDisabled, setIsDisabled] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const addToCartHandler = useAddToCart({ id: id ? +id : 0, setIsDisabled });
  const dispatch = useDispatch<AppDispatch>();
  const wishlistItems = useSelector(
    (state: RootState) => state.WishListSlice.itemsId || []
  );

  const { productDetails, loading } = useSelector(
    (state: RootState) => state.productsSlice
  );
  const selector = useSelector((state: RootState) => state.CartSlice.items);

  const quantityRemain = productDetails.max - (selector[`${id}`] ?? 0);
  const reachMax = quantityRemain <= 0;

  const isLiked = wishlistItems.includes(productDetails.id);

  const { accessToken } = useSelector((state: RootState) => state.AuthSlice);

  const addToWishListHandler = useAddToWishList({
    accessToken,
    id: id ? +id : 0,
    likeLoading,
    setLikeLoading,
  });

  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(+id));
    }
    if (!isDisabled) {
      return;
    }
    const debounce = setTimeout(() => {
      setIsDisabled(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [dispatch, id, isDisabled]);

  if (loading == "idle" || !productDetails) {
    return <div>Loading...</div>;
  }

  const settings = {
    customPaging: function (i: number) {
      return (
        <a>
          <img
            className="object-fit-contain"
            style={{
              height: "60px",
              width: "70px",
            }}
            src={
              productDetails.images != undefined ? productDetails.images[i] : ""
            }
            alt={`Thumbnail ${i}`}
          />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="container mb-5">
        <div className="card mt-3 p-5">
          <div className="container-fluid">
            <div className="wrapper row">
              <div className="preview col-md-6">
                <div className="slider-container">
                  <Slider {...settings}>
                    {productDetails.images?.map((photo, index) => (
                      <div key={index}>
                        <img
                          style={{ maxHeight: "400px", width: "100%" }} // Adjust image size here
                          className="object-fit-contain"
                          src={photo}
                          alt={`Product Image ${index + 1}`}
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>

              <div className="details col-md-6">
                <h3 className="product-title">{productDetails?.title}</h3>
                <h5>Category: {productDetails?.cat_prefix}</h5>
                <div className="rating">
                  <div className="stars">
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star" />
                    <span className="fa fa-star" />
                  </div>
                  <span className="review-no">41 reviews</span>
                </div>
                <p className="product-description">{productDetails.title}</p>
                <h6>Maximum Items: {productDetails?.max}</h6>
                <h6>Available Items: {quantityRemain}</h6>
                <h4 className="price mt-3">
                  Current Price:{" "}
                  <span>${productDetails.price.toLocaleString()}</span>
                </h4>

                <div className="action mt-2">
                  <button
                    disabled={isDisabled || reachMax}
                    className="add-to-cart btn btn-default"
                    type="button"
                    onClick={addToCartHandler}
                  >
                    {isDisabled ? (
                      <>
                        Loading... <i className="fa fa-spinner fa-spin"></i>
                      </>
                    ) : (
                      "Add to Cart"
                    )}
                  </button>
                  <button
                    className={`like btn btn-default ${
                      isLiked ? "active" : ""
                    } `}
                    type="button"
                    disabled={likeLoading}
                    onClick={addToWishListHandler}
                  >
                    <span className="fa fa-heart" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TitleSection title="Related Products">Explore More</TitleSection>
      <RelatedProducts category={productDetails.cat_prefix} />
    </>
  );
};

export default ProductDetails;
