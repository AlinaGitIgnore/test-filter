import { Navigate, Route, Routes } from 'react-router';
//components
import Layout from './components/Layout';
import Header from './components/Header';
//pages
import ProductsPage from './pages/ProductsPage';
import NewProductPage from './pages/NewProductPage';

import styled from './App.module.scss';

function App() {
  return (
    <div className={styled.mainContainer}>
      <Header />
      <Layout>
        <Routes>
          <Route index path="/products" element={<ProductsPage />} />
          <Route path="/newProduct" element={<NewProductPage />} />
          <Route path="*" element={<Navigate to="products" replace />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
