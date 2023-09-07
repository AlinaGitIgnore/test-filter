import { useState, useMemo } from 'react';
//types
import type { ProductItemProps } from './index.props';
//components
import { ReactComponent as DeleteSvg } from '../../assets/svg/bin.svg';
//hooks
import { useTypedDispatch } from '../../redux/hooks/reduxHooks';
//utils
import { useMediaQuery } from 'react-responsive';
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

  const isMobile = useMediaQuery({
    query: `(max-width: 720px)`,
  });

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

        {!isMobile ? <td>{product.description}</td> : null}

        <td>${product.price}</td>
        {!isMobile ? (
          <td>
            <img
              src={imageSrc}
              alt={product.title}
              className={styled.productImage}
            />
          </td>
        ) : null}
        {!isMobile ? <td>{product.rating}</td> : null}
        {!isMobile ? <td>{product.stock}</td> : null}
        <td>{product.category}</td>
      </tr>
    </>
  );
};

export default ProductItem;
