import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as apiService from '../apiService/api';
import {
  NewProduct,
  Product,
  ProductsState,
  ResponseNewProduct,
} from './types';

export const fetchProducts = createAsyncThunk<
  Product[],
  undefined,
  { rejectValue: string }
>('products/fetchProducts', async function (_, { rejectWithValue }) {
  const { data } = await apiService.fetchProducts();

  if (!data) {
    return rejectWithValue('Server Error!');
  }

  return data.products as Product[];
});

export const addNewProduct = createAsyncThunk<
  ResponseNewProduct,
  NewProduct,
  { rejectValue: string }
>(
  'products/addNewProduct',
  async function (newProductData, { rejectWithValue }) {
    const { data } = await apiService.addNewProduct(newProductData);
    if (!data) {
      return rejectWithValue('Server Error!');
    }

    return data as ResponseNewProduct;
  },
);

function convertProductWithIdToProduct(
  newProduct: ResponseNewProduct,
): Product {
  return {
    id: newProduct.id,
    title: newProduct.title,
    author: '',
    createdAt: 0,
    rating: newProduct.rating,
    description: '',
    price: 0,
    discountPercentage: 0,
    stock: 0,
    brand: '',
    category: '',
    thumbnail: '',
    images: [''],
  };
}

const initialState: ProductsState = {
  list: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.error as Error).message;
      })
      .addCase(addNewProduct.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        const product = convertProductWithIdToProduct(action.payload);
        state.loading = false;
        state.list = [...state.list, product];
        state.error = null;
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.error as Error).message;
      });
  },
});

export default productSlice.reducer;
