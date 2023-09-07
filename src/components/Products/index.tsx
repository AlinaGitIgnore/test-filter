import React from 'react';

import { ProductsProps } from './index.props';
//utils
import { useEffect, useState, useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useTypedSelector } from '../../redux/hooks/reduxHooks';
//constants
import { TABLE_HEADERS } from '../../constants';
//components
import { Loading } from '../Loading';
import ProductItem from '../ProductItem';
import FilterModal from '../../components/FilterModal';
import Search from '../Search';
import { ReactComponent as SortSvg } from '../../assets/svg/sort-amount-asc.svg';
import { ReactComponent as FilterSvg } from '../../assets/svg/filter.svg';
//types
import type { SelectedValues } from '../../types';
import type { Product } from '../../types';
//styles
import styled from './index.module.scss';

const Products = ({ products }: ProductsProps) => {
  const isLoading = useTypedSelector(state => state.loading);
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ascending, setAscending] = useState(true);
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
    setAscending(!ascending);
    applySort(label.toLowerCase() as keyof Product, !ascending);
  };

  useEffect(() => {
    if (query.length) {
      applySearch();
    } else {
      applyFilters();
    }
  }, [applyFilters, applySearch, query.length]);

  const isMobile = useMediaQuery({
    query: `(max-width: 720px)`,
  });

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
      {!isLoading ? (
        <div className={styled.productsWrapper}>
          <table className={styled.productTable}>
            <thead className={styled.tableHeader}>
              <tr>
                {TABLE_HEADERS.map(header => (
                  <React.Fragment key={header.label}>
                    {!isMobile ||
                    (isMobile &&
                      !['Description', 'Rating', 'Stock', 'Image'].includes(
                        header.label,
                      )) ? (
                      <th>
                        <span>{header.label}</span>
                        <div className={styled.actions}>
                          <SortSvg onClick={() => handleSort(header.label)} />
                        </div>
                      </th>
                    ) : null}
                  </React.Fragment>
                ))}
              </tr>
            </thead>

            <tbody className={styled.productsTableBody}>
              {resultProducts.map(product => (
                <ProductItem product={product} key={product.id} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Products;
