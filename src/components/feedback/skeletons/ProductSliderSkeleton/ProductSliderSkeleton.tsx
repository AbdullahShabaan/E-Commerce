import ContentLoader from "react-content-loader";
import { Row, Col } from "react-bootstrap";

const ProductSliderSkeleton = () => {
  const skeletonsList = (
    <ContentLoader
      speed={2}
      width={190}
      height={460}
      viewBox="0 0 190 460"
      backgroundColor="#f3f3f3"
      foregroundColor="#dbd2d2"
    >
      <rect x="5" y="293" rx="2" ry="2" width="140" height="10" />
      <rect x="5" y="274" rx="2" ry="2" width="140" height="10" />
      <rect x="0" y="28" rx="2" ry="2" width="192" height="225" />
      <rect x="7" y="320" rx="3" ry="3" width="97" height="6" />
    </ContentLoader>
  );

  return skeletonsList;
};

export default ProductSliderSkeleton;
