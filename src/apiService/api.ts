import axios from 'axios';
import { NewProduct } from '../redux/types';

const instance = axios.create({
  baseURL: 'https://dummyjson.com/',
});

export const fetchProducts = async () => {
  const res = await instance.get('https://dummyjson.com/products?limit=0');

  return res;
};

export const addNewProduct = async (newProductData: NewProduct) => {
  const res = await axios.post(
    'https://dummyjson.com/products/add',
    newProductData,
  );
  return res;
};

export const deleteProduct = async (id: number) => {
  const res = await axios.delete(`https://dummyjson.com/products/${id}`);
  return res;
};
