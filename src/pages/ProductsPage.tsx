import React, { useEffect, useState, useCallback } from 'react';
import { useTypedDispatch, useTypedSelector } from '../redux/hooks/reduxHooks';
import { fetchProducts } from '../redux/productsSlice';
import Products from '../components/Products';
import Search from '../components/Search';
import { Product } from '../redux/types';

const ProductsPage = () => {
  const products = useTypedSelector(state => state.list);
  const [query, setQuery] = useState('');

  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = useCallback(() => {
    const normalizeFilter = query.toLowerCase();

    const filteredProducts = products.filter(product => {
      return product.title.toLowerCase().includes(normalizeFilter);
    });
    return filteredProducts as Product[];
  }, [products, query]);

  return (
    <div>
      <Search setValue={setQuery} value={query} />
      <Products products={filteredProducts()} />
    </div>
  );
};

export default ProductsPage;
