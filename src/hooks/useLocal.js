const useLocal = () => {
  const getItem = (key) => {
    return JSON.parse(localStorage.getItem(key));
  };
  const setItem = (key, value) => {
    return localStorage.getItem(key, JSON.stringify(value));
  };
  return { getItem, setItem };
};

export default useLocal;
