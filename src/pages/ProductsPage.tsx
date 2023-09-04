import React, { useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from '../redux/hooks/reduxHooks';
import { fetchProducts } from '../redux/productsSlice';
import Products from '../components/Products';

const ProductsPage = () => {
  const products = useTypedSelector(state => state.list);

  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <Products products={products} />
    </div>
  );
};

export default ProductsPage;
