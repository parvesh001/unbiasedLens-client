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
  const [isLoading, setIsLoading] = useState(true);
  console.log(process.env.REACT_APP_BACKEND_DOMAIN)

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/category`);
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message);
        }
        const data = await response.json();
        setCategories(data.data.categories);
        setIsLoading(false)
      } catch (err) {
        setError({ scenario: "error", message: err.message });
        setIsLoading(false)
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
    isLoading
  };

  return (
    <CategoryContext.Provider value={values}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
