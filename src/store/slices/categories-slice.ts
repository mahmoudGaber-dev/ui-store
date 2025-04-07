import { faker } from "@faker-js/faker";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define a type for the slice state
interface ICategory {
  id: string | number;
  image: string;
  title: string;
}

interface ICategoriesState {
  list: ICategory[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

// Categories list async thunk

export const fetchAllCategories = createAsyncThunk<ICategory[]>(
  "categories/fetchAllCategories",
  async () => {
    //const categories = await axios;
    const categories = await axios.get("https://fakestoreapi.com/products");

    const _categories: ICategory[] = [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    categories.data?.forEach((product: any) => {
      // if category is in the categories array
      const category = _categories.find(
        (item) => item.title === product.category
      );
      if (!category)
        _categories.push({
          title: product.category,
          image: product.image,
          id: product.id,
        });
    });
    return _categories;
  }
);
//return categories; // ['category01','category02',...]

// ------------start category api---------
// Function to generate a single product category
const generateProductCategory = () => {
  return {
    id: faker.string.uuid(), // or faker.number.int() for numeric ID
    image: faker.image.urlPicsumPhotos(), // Generates a random image URL
    title: faker.commerce.department(), // Generates a random product category title
  };
};

// Function to generate an array of product categories
const generateProductCategories = (numCategories: number) => {
  return Array.from({ length: numCategories }, generateProductCategory);
};
// --------------end category api----------

// Example: Generate 10 product categories
const productCategories = generateProductCategories(10);

// Define the initial state using that type
const initialState: ICategoriesState = {
  list: productCategories,
  loading: "idle",
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
      const list = action.payload;
      state.loading = "succeeded";
      state.list = list;
    });
  },
});

export default categoriesSlice.reducer;
