import { getHTTP } from '../../configs/api.config';

export const getCategories = () => {
  /** get all categories */
  const res = getHTTP();
  return res;
};

export const getCategoryById = (categoryId) => {
  const res = getHTTP(`category/${categoryId}`);
  return res;
};
