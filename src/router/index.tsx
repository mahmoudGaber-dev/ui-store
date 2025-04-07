import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import HomePage from "../pages/home";
import CartPage from "../pages/cart";
import CheckoutPage from "../pages/checkout";
import WhishlistPage from "../pages/wishlist";
import NotFoundPage from "../pages/not-found";
import ProductDetailsPage from "../pages/product-details";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "/checkout",
        Component: CheckoutPage,
      },
      {
        path: "/wishlist",
        Component: WhishlistPage,
      },
      {
        path: "/product/:id",
        Component: ProductDetailsPage,
      },
      {
        path: "/cart",
        Component: CartPage,
      },
      {
        path: "/not-found",
        Component: NotFoundPage,
      },
      {
        path: "*",
        Component:()=> <Navigate to="/not-found" />,
      },
    ],
  },
]);

export default router;
