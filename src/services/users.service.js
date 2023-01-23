import base from "./base.service";

const securedInstance = base.service(true);

export const getMyProducts = (id, page, size) => securedInstance.get(`/users/${id}/products?page=${page}&size=${size}`);

export const getPurchases = (id, page, size) => securedInstance.get(`/users/${id}/purchases?page=${page}&size=${size}`);

export const updateProfile = (id, user) => securedInstance.put(`/users/${id}`, user);

export default {
  getMyProducts,
  getPurchases,
  updateProfile
};
