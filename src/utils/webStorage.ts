export const webStorage = {
  get: (key: string) => JSON.parse(String(localStorage.getItem(key))),
  set: (key: string, value: string) => {
    return localStorage.setItem(key, JSON.stringify(value));
  },
  clear: () => localStorage.clear(),
};
