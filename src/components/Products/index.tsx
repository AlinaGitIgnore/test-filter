import React from 'react';
import { Product } from '../../redux/types';

interface IProps {
  products: Product[];
}

const Products = ({ products }: IProps) => {
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
};

export default Products;
