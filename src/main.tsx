import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import router from "./router/index.tsx";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { Toaster } from "react-hot-toast";

//start with library css
import "bootstrap/dist/css/bootstrap.min.css";
//custom css
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
    ,
  </StrictMode>
);
