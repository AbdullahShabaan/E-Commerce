import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./Categories/categoriesSlice";
import productsSlice from "./Products/productsSlice";
import CartSlice from "./Cart/CartSlice";
import WishListSlice from "./Wishlist/WishListSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import AuthSlice from "./Auth/AuthSlice";

const cartPersistConfig = {
  key: "CartSlice",
  storage,
  whiteList: ["items"],
};
const authPersistConfig = {
  key: "AuthSlice",
  storage,
  whiteList: ["user", "accessToken"],
};

// const wishlistPersistConfig = {
//   key: "WishListSlice",
//   storage,
//   whitelist: ["itemsId"],
// };

const rootReducer = combineReducers({
  categoriesSlice,
  productsSlice,
  AuthSlice: persistReducer(authPersistConfig, AuthSlice),
  WishListSlice,
  CartSlice: persistReducer(cartPersistConfig, CartSlice),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
