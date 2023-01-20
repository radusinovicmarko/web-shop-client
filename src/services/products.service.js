import base from "./base.service";

const instance = base.service(false);

export const getAll = (page, size) =>
  instance.get(`/products?page=${page}&size=${size}`);

export const getByCategory = (categoryId, page, size) =>
  instance.get(`/products/category/${categoryId}?page=${page}&size=${size}`);

export default {
  getAll,
  getByCategory
};
