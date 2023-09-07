//utils
import axios from 'axios';

//types
import { NewProduct } from '../types';

const BASE_URL = 'https://dummyjson.com/';

const instance = axios.create({
  baseURL: BASE_URL,
});

export const fetchProducts = async () => {
  return await instance.get('products?limit=0');
};

export const addNewProduct = async (newProductData: NewProduct) => {
  return await instance.post('products/add', newProductData);
};

export const deleteProduct = async (id: number) => {
  return await instance.delete(`https://dummyjson.com/products/${id}`);
};
