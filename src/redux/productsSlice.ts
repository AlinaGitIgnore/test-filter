import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as apiService from '../apiService/api';
import { Product, ProductsState } from './types';

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
        state.loading = true;
        state.error = (action.error as Error).message;
      });
  },
});

export default productSlice.reducer;
