import { useState, useMemo } from 'react';
//types
import type { ProductItemProps } from './index.props';
//components
import { ReactComponent as DeleteSvg } from '../../assets/svg/bin.svg';
//hooks
import { useTypedDispatch } from '../../redux/hooks/reduxHooks';
//utils
import { deleteProduct } from '../../redux/productsSlice';
// assets
import defaultImage from '../../assets/img/defaultImage.jpg';
//styles
import styled from './index.module.scss';

const ProductItem = ({ product }: ProductItemProps) => {
  const [showDelete, setShowDelete] = useState(false);
  const dispatch = useTypedDispatch();

  const handleDelete = () => {
    dispatch(deleteProduct(product.id));
  };

  const imageSrc = useMemo(() => {
    return product.images && product.images[0] !== ''
      ? product.images[0]
      : defaultImage;
  }, [product]);

  return (
    <>
      <tr
        className={styled.productItem}
        key={product.id}
        onMouseEnter={() => setShowDelete(true)}
        onMouseLeave={() => setShowDelete(false)}
      >
        <td className={styled.id}>
          {showDelete ? (
            <DeleteSvg className={styled.deleteButton} onClick={handleDelete} />
          ) : null}
          {product.id}
        </td>
        <td>{product.title}</td>
        <td>{product.description}</td>
        <td>${product.price}</td>
        <td>
          <img
            src={imageSrc}
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
