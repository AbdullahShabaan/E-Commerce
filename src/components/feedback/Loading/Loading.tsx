import { TLoading } from "src/types/TLoading";
import CategorySkeleton from "../skeletons/CategorySkeleton/CategorySkeleton";
import ProductSkeleton from "../skeletons/ProductSkeleton/ProductSkeleton";
import CartSkeleton from "../skeletons/CartSkeleton/CartSkeleton";
import Lottie from "lottie-react";
import errorAnimation from "@assets/Error404.json";
const skeletons = {
  category: CategorySkeleton,
  product: ProductSkeleton,
  cart: CartSkeleton,
};

interface ILoadingProps {
  loading: TLoading;
  error: string | null;
  children: React.ReactNode;
  type?: keyof typeof skeletons;
}

const Loading = ({
  children,
  error,
  loading,
  type = "cart",
}: ILoadingProps) => {
  const Componenet = skeletons[type] as React.FC;
  if (loading === "pending") {
    return <Componenet />;
  }
  if (loading == "failed") {
    return (
      <div className="d-flex align-items-center  flex-column">
        <Lottie
          style={{ width: "400px" }}
          animationData={errorAnimation}
          loop={true}
        />
        <p>{error}</p>
      </div>
    );
  }

  return children;
};

export default Loading;
