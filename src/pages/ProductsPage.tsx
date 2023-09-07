// hooks
import { useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from '../redux/hooks/reduxHooks';
// utils
import { fetchProducts } from '../redux/productsSlice';
// components
import Products from '../components/Products';

const ProductsPage = () => {
  const products = useTypedSelector(state => state.list);

  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  return <Products products={products} />;
};

export default ProductsPage;
