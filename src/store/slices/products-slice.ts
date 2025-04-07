import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define a type for the slice state
export interface IProduct {
  id: string | number;
  image: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  name:string;
}

export interface IProductApI extends Omit<IProduct,'id'> {
  title: string;
  _id: string;
}


interface IProductsState {
  list: IProduct[];
}

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async () => {
    const data = await axios
      .get("https://fakestoreapi.com/products")
      .then((response) => response.data);
    return data;
  }
);

//------------start products api ------------
// Function to generate a single product
// const generateProduct = () => {
//   return {
//     id: faker.number.int(), // Generates a unique numeric ID
//     title: faker.commerce.productName(), // Generates a random product title
//     price: +faker.commerce.price({ min: 0.1, max: 1000, dec: 2 }), // Generates a random price between 0.1 and 1000
//     description: faker.commerce.productDescription(), // Generates a random product description
//     category: faker.commerce.department(), // Generates a random product category
//     image: faker.image.urlPicsumPhotos(), // Generates a random image URL
//     stock: faker.number.int(),
//   };
// };

// Function to generate an array of products
// const generateProducts = (numProducts: number) => {
//   return Array.from({ length: numProducts }, generateProduct);
// };
//------------end products api ------------

// Example: Generate 10 products
// const products = generateProducts(10);

// Define the initial state using that type
const initialState: IProductsState = {
  list: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getAllProducts.fulfilled, (state, action) => {
        const products = action.payload;
        state.list = products;
      })
    },
});

export default productsSlice.reducer;
