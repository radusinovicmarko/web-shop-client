import base from "./base.service";

const instance = base.service(false);
const sessionStorageKey = "auth";

export const login = (username, password) =>
  instance.post("/auth/login", { username, password }).then((res) => {
    const user = res.data;
    if (user.token) {
      sessionStorage.setItem(sessionStorageKey, user.token);
      return { ...user, token: null };
    } else return { ...user, activate: true };
  });

export const register = (user) =>
  instance.post("/auth/register", user).then(res => res.data);

export const activate = (username, pin) =>
  instance.post("/auth/activate", { username, pin }).then((res) => {
    sessionStorage.setItem(sessionStorageKey, res.data.token);
    return { ...res.data, token: null };
  });

export const logout = () => sessionStorage.removeItem(sessionStorageKey);

export default {
  login,
  register,
  activate,
  logout
};
