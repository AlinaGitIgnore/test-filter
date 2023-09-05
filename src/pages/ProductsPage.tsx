import { useEffect, useState } from 'react';
import { useTypedDispatch, useTypedSelector } from '../redux/hooks/reduxHooks';
import { fetchProducts } from '../redux/productsSlice';
import Search from '../components/Search';
import Products from '../components/Products';

const ProductsPage = () => {
  const products = useTypedSelector(state => state.list);
  const [query, setQuery] = useState('');
  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  return (
    <div>
      <Search setValue={setQuery} value={query} />
      <Products products={products} query={query} />
    </div>
  );
};

export default ProductsPage;
