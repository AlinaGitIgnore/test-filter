import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://dummyjson.com/',
});

export const fetchProducts = async () => {
  const res = await instance.get('products');
  return res;
};

// export async function addTodo(todo: any) {
//   const res = await instance.post('/save', todo);
//   return res;
// }
