import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://dummyjson.com/',
});

export const fetchProducts = async () => {
  const res = await instance.get('products?limit=0');
  const categories: string[] = [];

  res.data.products.map((product: { category: string }) => {
    if (categories.includes(product.category)) return;
    else {
      categories.push(product.category);
    }
  });
  console.log(categories);
  return res;
};

// export async function addTodo(todo: any) {
//   const res = await instance.post('/save', todo);
//   return res;
// }
