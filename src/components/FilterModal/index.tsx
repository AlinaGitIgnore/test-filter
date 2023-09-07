import { useCallback, useState } from 'react';
//types
import type { Product } from '../../types';
import type { FilterModalProps } from './index.props';
//utils
import cn from 'classnames';
import { getUniqueFieldValues } from '../../utils/getUniqueFieldValues';
import { FILTERED_TABS } from '../../constants';

import { ReactComponent as FilterSvg } from '../../assets/svg/filter.svg';
//styles
import styled from './index.module.scss';

const FilterModal = ({
  applyFilters,
  closeModal,
  isOpen,
  products,
  selectedValues,
  setSelectedValues,
}: FilterModalProps) => {
  const [activeSection, setActiveSection] = useState('');

  const handleFilter = () => {
    applyFilters();
    closeModal();
  };

  // Заполняем данные для вкладок из массива
  FILTERED_TABS.forEach(tabData => {
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

  const toggleAccordion = (section: string) =>
    setActiveSection(activeSection === section ? '' : section);

  const toggleSelection = useCallback(
    (value: string | number, section: string) => {
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
    },
    [],
  );

  // renderTabCheckbox
  const renderTabChekbox = (tabData: (typeof FILTERED_TABS)[0]) => {
    return (
      <div className={styled.filterTabContent}>
        {tabData.values.map(item => (
          <label key={item}>
            <input
              type="checkbox"
              value={item}
              checked={selectedValues[tabData.section].includes(item)}
              onChange={() => toggleSelection(item, tabData.section)}
            />
            {item}
          </label>
        ))}
      </div>
    );
  };

  return (
    <div
      className={cn(styled.filterModal, {
        [styled.open]: isOpen,
      })}
    >
      <div className={styled.filterModalOverlay} onClick={closeModal} />
      <div className={styled.filterModalContent}>
        <div className={styled.filterTabs}>
          {FILTERED_TABS.map(tabData => (
            <div className={styled.filterTabWrapper} key={tabData.section}>
              <div
                className={cn(styled.filterTab, {
                  [styled.active]: activeSection === tabData.section,
                })}
                onClick={() => toggleAccordion(tabData.section)}
              >
                {tabData.label}
              </div>
              {activeSection === tabData.section
                ? renderTabChekbox(tabData)
                : null}
            </div>
          ))}
        </div>

        <button
          type="button"
          className={styled.buttonFiltering}
          onClick={handleFilter}
        >
          <FilterSvg />
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
