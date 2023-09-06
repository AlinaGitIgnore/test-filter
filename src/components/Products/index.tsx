import { Product } from '../../redux/types';
import { useEffect, useState, useCallback } from 'react';
import { ReactComponent as SortSvg } from '../../assets/svg/sort-amount-asc.svg';
import { ReactComponent as FilterSvg } from '../../assets/svg/filter.svg';
import FilterModal from '../../components/FilterModal';

import styled from './index.module.scss';

import Search from '../Search';
import { tableHeaders } from '../../utils/tableHeaders';

interface IProps {
  products: Product[];
}

export type SelectedValues = {
  [key: string]: (string | number)[];
};

const Products = ({ products }: IProps) => {
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ascending, setAccending] = useState(true);

  const [resultProducts, setResultProducts] = useState<Product[]>([]);
  const [selectedValues, setSelectedValues] = useState<SelectedValues>({
    id: [],
    title: [],
    description: [],
    price: [],
    images: [],
    rating: [],
    stock: [],
    category: [],
  });

  const applySearch = useCallback(() => {
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
      setResultProducts(searchedProductsByTitle);
    } else {
      setResultProducts(searchedByCategories);
    }
  }, [products, query]);

  const applyFilters = useCallback(() => {
    const filteredProducts = products.filter(product => {
      // Проверка для каждой вкладки фильтрации
      return Object.keys(selectedValues).every(key => {
        const selectedItems = selectedValues[key];
        if (selectedItems.length === 0) {
          return true; // Если нет выбранных элементов для данной вкладки, продукт проходит фильтрацию
        }
        const productValue = product[key as keyof Product];
        return selectedItems.includes(productValue as string | number);
      });
    });

    setResultProducts(filteredProducts);
  }, [products, selectedValues]);

  // Функция для сортировки списка Product[]
  const applySort = (field: keyof Product, ascending: boolean = true) => {
    const sortedProductsNew = [...resultProducts];

    const sortedList = sortedProductsNew.sort((a, b) => {
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

    setResultProducts(sortedList);
  };

  const handleSort = (label: string) => {
    setAccending(!ascending);
    applySort(label.toLowerCase() as keyof Product, !ascending);
  };

  useEffect(() => {
    if (query.length) {
      applySearch();
    } else {
      applyFilters();
    }
  }, [applyFilters, applySearch, query.length]);

  return (
    <>
      {isModalOpen && (
        <FilterModal
          applyFilters={applyFilters}
          closeModal={() => setIsModalOpen(false)}
          isOpen={isModalOpen}
          products={products}
          setSelectedValues={setSelectedValues}
          selectedValues={selectedValues}
        />
      )}
      <Search setValue={setQuery} value={query} />
      <button
        type="button"
        className={styled.buttonFiltering}
        onClick={() => setIsModalOpen(true)}
      >
        <FilterSvg />
        Filtering
      </button>
      <div className={styled.productsWrapper}>
        <table className={styled.productTable}>
          <thead className={styled.tableHeader}>
            <tr>
              {tableHeaders.map(header => (
                <th key={header.label}>
                  <span>{header.label}</span>
                  <div className={styled.actions}>
                    <SortSvg onClick={() => handleSort(header.label)} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className={styled.productsTableBody}>
            {resultProducts.map(product => (
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
    </>
  );
};

export default Products;
