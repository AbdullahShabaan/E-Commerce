import { lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "@pages/ErrorPage";

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

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback="Loading....">
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
            <Suspense fallback="Loading......">
              <AboutsUs />
            </Suspense>
          ),
        },
        {
          path: "cart",
          element: (
            <Suspense fallback="Loading......">
              <Cart />
            </Suspense>
          ),
        },
        {
          path: "wishlist",
          element: (
            <Suspense fallback="Loading......">
              <WishList />
            </Suspense>
          ),
        },
        {
          path: "home",
          element: (
            <Suspense fallback="Loading......">
              <Home />
            </Suspense>
          ),
        },
        {
          path: "login",
          element: (
            <Suspense fallback="Loading......">
              <Login />
            </Suspense>
          ),
        },
        {
          path: "register",
          element: (
            <Suspense fallback="Loading......">
              <Register />
            </Suspense>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
};

export default AppRouter;
