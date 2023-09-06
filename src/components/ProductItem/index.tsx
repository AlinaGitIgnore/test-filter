import React, { useState } from 'react';
import { Product } from '../../redux/types';
import { ReactComponent as DeleteSvg } from '../../assets/svg/bin.svg';
import defaultUmage from '../../assets/img/defaultImage.jpg';
import styled from './index.module.scss';
import { useTypedDispatch } from '../../redux/hooks/reduxHooks';
import { deleteProduct } from '../../redux/productsSlice';

interface IProps {
  product: Product;
}

const ProductItem = ({ product }: IProps) => {
  const [showDelete, setShowDelete] = useState(false);
  const dispatch = useTypedDispatch();

  const handleDelete = () => {
    dispatch(deleteProduct(product.id));
  };

  return (
    <>
      <tr
        className={styled.productItem}
        key={product.id}
        onMouseEnter={() => setShowDelete(true)}
        onMouseLeave={() => setShowDelete(false)}
      >
        <td className={styled.id}>
          {showDelete && (
            <DeleteSvg className={styled.deleteButton} onClick={handleDelete} />
          )}
          {product.id}
        </td>
        <td>{product.title}</td>
        <td>{product.description}</td>
        <td>${product.price}</td>
        <td>
          <img
            src={
              product.images && product.images[0] !== ''
                ? product.images[0]
                : defaultUmage
            }
            alt={product.title}
            className={styled.productImage}
          />
        </td>
        <td>{product.rating}</td>
        <td>{product.stock}</td>
        <td>{product.category}</td>
      </tr>
    </>
  );
};

export default ProductItem;
