import { MainLayout } from "@layouts/index";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
//pages
import {
  Categories,
  Products,
  AboutsUs,
  Home,
  Login,
  Register,
  Cart,
} from "@pages/index";
import ErrorPage from "@pages/ErrorPage";
import WishList from "@pages/WishList";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
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
          element: <AboutsUs />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "wishlist",
          element: <WishList />,
        },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
};

export default AppRouter;
