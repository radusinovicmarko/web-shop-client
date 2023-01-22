import base from "./base.service";

const instance = base.service(false);

export const getAll = (title, page, size) => {
  let query = `page=${page}&size=${size}`;
  query = title !== "" ? `title=${title}&${query}` : query;
  return instance.get(`/products?${query}`);
};

export const getByCategory = (categoryId, page, size) =>
  instance.get(`/products/category/${categoryId}?page=${page}&size=${size}`);

export const getByAttribute = (attributeId, value, from, to, page, size) => {
  const url = `/products/attribute/${attributeId}`;
  let query = `page=${page}&size=${size}`;
  query = value !== "" ? `value=${value}&${query}` : `from=${from}&to=${to}&${query}`;
  return instance.get(`${url}?${query}`);
};

export const get = (id) => instance.get(`/products/${id}`);

export default {
  getAll,
  getByCategory,
  getByAttribute,
  get
};
