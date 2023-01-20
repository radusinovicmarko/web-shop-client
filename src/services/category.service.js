import base from "./base.service";

const instance = base.service(false);

export const getAll = () => instance.get("/categories");

export default {
  getAll
};
