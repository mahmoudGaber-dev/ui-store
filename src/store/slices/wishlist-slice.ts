import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "./products-slice";

// Define a type for the slice state

interface IWishlistState {
  list: IProduct["id"][];
  //list: Set<IProduct["id"]>;
}

// Define the initial state using that type
const initialState: IWishlistState = {
  //list: new Set(),
  list: [],
};

//id -> array of products  ids

export const wishlistSlice = createSlice({
  name: "wislist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const productId = action.payload;
      if (!(state.list.findIndex((item) => item === productId) > -1)) {
        state.list.push(productId);
      }
    },
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.list = state.list.filter((item) => item !== productId);
    },
    clearWishlist: (state) => {
      state.list = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
