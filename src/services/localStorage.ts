export const getItemLocalStorage = (key: string) => {
  const localStorageData = localStorage.getItem(key);

  return localStorageData ? JSON.parse(localStorageData) : null;
};

export const setItemLocalStorage = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const removeItemLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
