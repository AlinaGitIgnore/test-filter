import React from 'react';
import { Product } from '../../redux/types';
import styled from './index.module.scss';

interface IProps {
  products: Product[];
}

const Products = ({ products }: IProps) => {
  return (
    <div className={styled.productsWrapper}>
      {' '}
      <table className={styled.productTable}>
        <thead className={styled.tableHeader}>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
            <th>Rating</th>
            <th>Stock</th>
            <th>Category</th>
          </tr>
        </thead>

        <tbody className={styled.productsTableBody}>
          {products.map(product => (
            <tr className={styled.productItem} key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className={styled.productImage}
                />
              </td>
              <td>{product.rating}</td>
              <td>{product.stock}</td>
              <td>{product.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
