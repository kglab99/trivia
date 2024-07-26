Gitarka

export const getItem = (key, parse = false) => {
  const saved = sessionStorage.getItem(key);
  return saved ? (parse ? JSON.parse(saved) : saved) : null;
};

export const setItem = (key, value) => {
  if (value === null || value === undefined) {
    sessionStorage.removeItem(key);
  } else {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeItem = (key) => {
  sessionStorage.removeItem(key);
};

export const clearAll = () => {
  sessionStorage.clear();
};
