import { TLoading } from "src/types/TLoading";

interface ILoadingProps {
  loading: TLoading;
  error: string | null;
  children: React.ReactNode;
}

const Loading = ({ children, error, loading }: ILoadingProps) => {
  if (loading === "pending") {
    return "please wait...";
  }
  if (loading == "failed") {
    return <p>{error}</p>;
  }

  return children;
};

export default Loading;
