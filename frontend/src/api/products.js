import axios from 'axios';

export const fetchProducts = async () => {
  const { data } = await axios.get('/api/products/');

  return data;
};

export const fetchSingleProduct = async (userId) => {
  const { data } = await axios.get(`/api/products/${userId}`);

  return data;
};
