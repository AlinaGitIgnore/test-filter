import { Product } from '../../redux/types';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { ReactComponent as SortSvg } from '../../assets/svg/sort-amount-asc.svg';
import { ReactComponent as FilterSvg } from '../../assets/svg/filter.svg';
import styled from './index.module.scss';

interface IProps {
  products: Product[];
  query: string;
}

const tableHeaders = [
  { label: 'ID', sortable: true, filterable: true },
  { label: 'Title', sortable: true, filterable: true },
  { label: 'Description', sortable: true, filterable: true },
  { label: 'Price', sortable: true, filterable: true },
  { label: 'Image', sortable: true, filterable: true },
  { label: 'Rating', sortable: true, filterable: true },
  { label: 'Stock', sortable: true, filterable: true },
  { label: 'Category', sortable: true, filterable: true },
];

const Products = ({ products, query }: IProps) => {
  const [ascending, setAccending] = useState(true);

  const searchedProducts = useMemo(() => {
    if (query.length) {
      const normalizeFilter = query.toLowerCase();

      const searchedByCategories = products.filter(
        product =>
          product.category &&
          product.category.toLowerCase().includes(normalizeFilter),
      );

      if (!searchedByCategories.length) {
        const searchedProductsByTitle = products.filter(product => {
          return product.title.toLowerCase().includes(normalizeFilter);
        });
        return searchedProductsByTitle;
      } else return searchedByCategories;
    } else return products;
  }, [products, query]);

  const [sortedProducts, setSortedProducts] =
    useState<Product[]>(searchedProducts);

  // Функция для сортировки списка Product[]
  const sortProducts = useCallback(
    (field: keyof Product, ascending: boolean = true) => {
      const sortedProductsNew = [...searchedProducts];

      sortedProductsNew.sort((a, b) => {
        if (a && b) {
          const valueA = a[field];
          const valueB = b[field];

          if (valueA !== undefined && valueB !== undefined) {
            if (ascending) {
              if (valueA < valueB) return -1;
              if (valueA > valueB) return 1;
            } else {
              if (valueA < valueB) return 1;
              if (valueA > valueB) return -1;
            }
          }
        }

        return 0;
      });

      setSortedProducts(sortedProductsNew);
    },
    [searchedProducts],
  );

  const handleSort = (label: string) => {
    setAccending(!ascending);
    sortProducts(label.toLowerCase() as keyof Product, ascending);
  };

  useEffect(() => {
    sortProducts('id');
  }, [sortProducts]);

  return (
    <div className={styled.productsWrapper}>
      <table className={styled.productTable}>
        <thead className={styled.tableHeader}>
          <tr>
            {tableHeaders.map(header => (
              <th key={header.label}>
                <span>{header.label}</span>
                <div className={styled.actions}>
                  {header.label !== 'Image' && (
                    <SortSvg onClick={() => handleSort(header.label)} />
                  )}
                  <FilterSvg />
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className={styled.productsTableBody}>
          {sortedProducts.map(product => (
            <tr className={styled.productItem} key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>
                <img
                  src={product.images ? product.images[0] : ''}
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
