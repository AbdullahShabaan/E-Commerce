import { RootState } from "@store/store";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const { accessToken } = useSelector((state: RootState) => state.AuthSlice);
  if (!accessToken) {
    toast("Please log in to view this content.", {
      icon: "🔒",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default ProtectRoute;
