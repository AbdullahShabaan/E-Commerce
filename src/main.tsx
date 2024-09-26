import { createRoot } from "react-dom/client";
import AppRouter from "@routes/AppRouter";
import "@services/axiosGlobal.ts";
import { Provider } from "react-redux";
import store, { persistor } from "@store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
//styles
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
      <Toaster />
    </PersistGate>
  </Provider>
);
