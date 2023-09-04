export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  author?: string;
  year: number;
};

export type NewProduct = {
  id: number;
  title: string;
  author: string;
  year: number;
  rating: number;
};

export type ProductsState = {
  list: Product[];
  loading: boolean;
  error: string | null;
};
