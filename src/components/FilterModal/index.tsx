import React, { Dispatch, useState } from 'react';
import { ReactComponent as FilterSvg } from '../../assets/svg/filter.svg';
import { Product } from '../../redux/types';
import styled from './index.module.scss';
import { getUniqueFieldValues } from '../../utils/getUniqueFieldValues';
import { filterTabsData } from '../../utils/filtertabsData';
import { SelectedValues } from '../Products';

interface IProps {
  closeModal: () => void;
  isOpen: boolean;
  products: Product[];
  applyFilters: () => void;
  setSelectedValues: Dispatch<React.SetStateAction<SelectedValues>>;
  selectedValues: SelectedValues;
}

const FilterModal = ({
  closeModal,
  isOpen,
  products,
  applyFilters,
  setSelectedValues,
  selectedValues,
}: IProps) => {
  const [activeSection, setActiveSection] = useState('');

  const handleClick = () => {
    applyFilters();
    closeModal();
  };
  const toggleSelection = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string | number,
    section: string,
  ) => {
    event.stopPropagation();
    setSelectedValues(prevState => {
      const selectedValues = { ...prevState };
      const selectedArray = selectedValues[section];
      const index = selectedArray.indexOf(value);

      if (index > -1) {
        selectedArray.splice(index, 1);
      } else {
        selectedArray.push(value);
      }

      return selectedValues;
    });
  };

  // Заполняем данные для вкладок из массива
  filterTabsData.forEach(tabData => {
    if (tabData.section === 'description') {
      tabData.values = ['with description', 'without description'];
    } else if (tabData.section === 'images') {
      tabData.values = ['with image', 'without image'];
    } else {
      tabData.values = getUniqueFieldValues(
        products,
        tabData.section as keyof Product,
      );
    }
  });

  const toggleAccordion = (section: string) => {
    setActiveSection(activeSection === section ? '' : section);
  };

  const renderTabChekbox = (tabData: (typeof filterTabsData)[0]) => {
    return (
      <div className={styled.filterTabContent}>
        {tabData.values.map(item => (
          <label key={item}>
            <input
              type="checkbox"
              value={item}
              checked={selectedValues[tabData.section].includes(item)}
              onChange={event => toggleSelection(event, item, tabData.section)}
            />
            {item}
          </label>
        ))}
      </div>
    );
  };

  return (
    <div className={`${styled.filterModal} ${isOpen ? styled.open : ''}`}>
      <div className={styled.filterModalOverlay} onClick={closeModal} />
      <div className={styled.filterModalContent}>
        <div className={styled.filterTabs}>
          {filterTabsData.map(tabData => (
            <div className={styled.filterTabWrapper} key={tabData.section}>
              <div
                className={`${styled.filterTab} ${
                  activeSection === tabData.section ? styled.active : ''
                }`}
                onClick={() => toggleAccordion(tabData.section)}
              >
                {tabData.label}
              </div>
              {activeSection === tabData.section && renderTabChekbox(tabData)}
            </div>
          ))}
        </div>

        <button
          type="button"
          className={styled.buttonFiltering}
          onClick={handleClick}
        >
          <FilterSvg />
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
