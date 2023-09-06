import { Navigate, Route, Routes } from 'react-router';
import Layout from './components/Layout';
import ProductsPage from './pages/ProductsPage';
import { Header } from './components/Header';
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
