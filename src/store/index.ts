import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slices/categories-slice";
import productsReducer from "./slices/products-slice";
import wishlistReducer from "./slices/wishlist-slice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    wishlist: wishlistReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
