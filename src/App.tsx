import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ProductsPage from './pages/ProductsPage';
import NewProductForm from './components/NewProductForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}></Route>
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/newProduct" element={<NewProductForm />} />
    </Routes>
  );
}

export default App;
