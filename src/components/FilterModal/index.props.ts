import { Dispatch } from 'react';
import type { Product, SelectedValues } from '../../types';

export interface FilterModalProps {
  closeModal: () => void;
  isOpen: boolean;
  products: Product[];
  applyFilters: () => void;
  setSelectedValues: Dispatch<React.SetStateAction<SelectedValues>>;
  selectedValues: SelectedValues;
}
