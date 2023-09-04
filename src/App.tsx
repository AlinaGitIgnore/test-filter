import { Navigate, Route, Routes } from 'react-router';
import Layout from './components/Layout';
import ProductsPage from './pages/ProductsPage';
import NewProductForm from './components/NewProductForm';

import styled from './App.module.scss';
import { Header } from './components/Header';

function App() {
  return (
    <div className={styled.mainContainer}>
      <Header />
      <Layout>
        <Routes>
          <Route index path="/products" element={<ProductsPage />} />
          <Route path="/newProduct" element={<NewProductForm />} />
          <Route path="*" element={<Navigate to="products" replace />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
