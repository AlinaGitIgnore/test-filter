import { Product } from '../redux/types';

// Функция для получения уникальных значений по заданному полю
export function getUniqueFieldValues<T>(
  products: Product[],
  field: keyof Product,
): T[] {
  const uniqueValues = new Set<T>();

  products.forEach(product => {
    const value = product[field];
    if (value !== undefined) {
      uniqueValues.add(value as T);
    }
  });

  const sortedArray = Array.from(uniqueValues).sort((a, b) => {
    if (typeof a === 'number' && typeof b === 'number') {
      return a - b;
    }
    if (typeof a === 'string' && typeof b === 'string') {
      return a.localeCompare(b);
    }
    // Добавьте другие типы данных, если необходимо
    return 0;
  });

  return sortedArray;
}
