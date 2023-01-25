import base from "./base.service";

const securedInstance = base.service(true);

export const addMessage = (message) => securedInstance.post("/messages", message);

export default {
  addMessage
};
