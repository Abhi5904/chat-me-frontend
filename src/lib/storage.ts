/* eslint-disable @typescript-eslint/no-explicit-any */
const setToStorage = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

const getFromStorage = (key: string) => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(key);
    return data && typeof data === "string" ? JSON.parse(data) : data;
  }
  return null;
};

export { setToStorage, getFromStorage };
