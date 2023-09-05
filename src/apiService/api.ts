import axios from 'axios';
import { NewProduct } from '../redux/types';

const instance = axios.create({
  baseURL: 'https://dummyjson.com/',
});

export const fetchProducts = async () => {
  const res = await instance.get('products?limit=0');

  return res;
};

export const addNewProduct = async (newProductData: NewProduct) => {
  const res = await axios.post(
    'https://dummyjson.com/products/add',
    newProductData,
  );
  return res;
};
