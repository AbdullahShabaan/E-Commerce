import { lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "@pages/ErrorPage";
import Lottie from "lottie-react";
import loadingPages from "../assets/loaderCart.json";
import Profile from "@pages/Profile";
import ProtectRoute from "@components/Auth/ProtectRoute/ProtectRoute";
import ProductDetails from "@pages/ProductDetails";
// Pages
const MainLayout = lazy(() => import("@layouts/MainLayout/MainLayout"));
const Categories = lazy(() => import("@pages/Categories"));
const Products = lazy(() => import("@pages/Products"));
const AboutsUs = lazy(() => import("@pages/AboutsUs"));
const Home = lazy(() => import("@pages/Home"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const Cart = lazy(() => import("@pages/Cart"));
const WishList = lazy(() => import("@pages/WishList"));
const Loader = (
  <div className="loading-cart">
    <div className="position-absolute translate-middle top-50 start-50">
      <Lottie
        style={{ width: "300px" }}
        animationData={loadingPages}
        loop={true}
      />
    </div>
  </div>
);
const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={Loader}>
          <MainLayout />
        </Suspense>
      ),
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "categories/products/:prefix",
          element: <Products />,
          loader: ({ params }) => {
            if (
              typeof params.prefix !== "string" ||
              !/^[a-z]+$/i.test(params.prefix)
            ) {
              throw new Response("Invalid prefix: " + params.prefix, {
                status: 400,
                statusText: "Invalid Category",
              });
            }
            return true;
          },
        },
        {
          path: "aboutsUs",
          element: (
            <Suspense fallback={Loader}>
              <AboutsUs />
            </Suspense>
          ),
        },
        {
          path: "cart",
          element: (
            <Suspense fallback={Loader}>
              <Cart />
            </Suspense>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectRoute>
              <Suspense fallback={Loader}>
                <WishList />
              </Suspense>
            </ProtectRoute>
          ),
        },
        {
          path: "home",
          element: (
            <Suspense fallback={Loader}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "login",
          element: (
            <Suspense fallback={Loader}>
              <Login />
            </Suspense>
          ),
        },
        {
          path: "register",
          element: (
            <Suspense fallback={Loader}>
              <Register />
            </Suspense>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectRoute>
              <Suspense fallback={Loader}>
                <Profile />
              </Suspense>
            </ProtectRoute>
          ),
        },
        {
          path: "/productDetails/:id",
          element: (
            <Suspense fallback={Loader}>
              <ProductDetails />
            </Suspense>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
};

export default AppRouter;
