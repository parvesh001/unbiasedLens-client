import { createContext, useEffect, useState } from "react";

export const CategoryContext = createContext({
  categories: [],
  addCategory: () => {},
  updateCategory: () => {},
  removeCategory: () => {},
  error: null,
});

const CategoryContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch("http://localhost:8080/api/v1/category");
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message);
        }
        const data = await response.json();
        setCategories(data.data.categories);
      } catch (err) {
        setError({ scenario: "error", message: err.message });
      }
    })();
  }, []);

  const handleAddCategory = (category) => {
    setCategories((prevCategories) => {
      return [ ...prevCategories,category];
    });
  };
  const handleUpdateCategory = (id) => {};
  const handleRemoveCategory = (id) => {};

  const values = {
    categories,
    addCategory: handleAddCategory,
    updateCategory: handleUpdateCategory,
    removeCategory: handleRemoveCategory,
    error,
    setError: () => setError(null),
  };

  return (
    <CategoryContext.Provider value={values}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
