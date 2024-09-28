import ContentLoader from "react-content-loader";

const CartSkeleton = () => {
  const skeletonsList = (
    <ContentLoader
      speed={2}
      width={280}
      height={198}
      viewBox="0 0 300 198"
      backgroundColor="#f3f3f3"
      foregroundColor="#dbd2d2"
    >
      <rect x="123" y="113" rx="2" ry="2" width="140" height="10" />
      <rect x="124" y="88" rx="2" ry="2" width="140" height="10" />
      <rect x="10" y="55" rx="2" ry="2" width="94" height="133" />
      <rect x="124" y="139" rx="3" ry="3" width="97" height="6" />
    </ContentLoader>
  );

  return skeletonsList;
};

export default CartSkeleton;
