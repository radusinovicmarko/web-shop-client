import base from "./base.service";

const instance = base.service(false);
const securedInstance = base.service(true);

export const getAll = (title, page, size) => {
  let query = `page=${page}&size=${size}`;
  query = title !== "" ? `title=${title}&${query}` : query;
  return instance.get(`/products?${query}`);
};

export const getByCategory = (categoryId, page, size) =>
  instance.get(`/products/category/${categoryId}?page=${page}&size=${size}`);

export const getByAttributes = (filters, page, size) => {
  const url = `/products/attributes?filters=${filters}&page=${page}&size=${size}`;
  // let query = `page=${page}&size=${size}`;
  // query = value !== "" ? `value=${value}&${query}` : `from=${from}&to=${to}&${query}`;
  return instance.get(url);
};

export const get = (id) => instance.get(`/products/${id}`);

export const addComment = (productId, comment) => securedInstance.post(`/products/${productId}/comments`, comment);

export const deleteProduct = (id) => securedInstance.delete(`/products/${id}`);

export const addProduct = (product) => securedInstance.post("/products", product);

export const buyProduct = (id, purchase) => securedInstance.post(`/products/${id}/purchase`, purchase);

export default {
  getAll,
  getByCategory,
  getByAttributes,
  get,
  addComment,
  deleteProduct,
  addProduct,
  buyProduct
};
