export const saveUser = (key, value) => {
  localStorage.setItem(key, value);
};

export const removeUser = (key) => {
  localStorage.removeItem(key);
};

export const getUser = (key) => {
  return localStorage.getItem(key);
};
