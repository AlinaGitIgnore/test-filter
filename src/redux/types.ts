export type Product = {
  id: number;
  title: string;
  author?: string;
  createdAt?: number;
  rating: number;
  description?: string;
  price?: number;
  discountPercentage?: number;
  stock?: number;
  brand?: string;
  category?: string;
  thumbnail?: string;
  images?: string[];
};

export type NewProduct = {
  title: string;
  author: string;
  createdAt: number;
  rating: number;
};

export type ResponseNewProduct = {
  id: number;
  rating: number;
  title: string;
};

export type ProductsState = {
  list: Product[];
  loading: boolean;
  error: string | null;
};
