import React, { useState, useEffect, useContext } from "react";
import useHttp from "../../../hooks/use-http";
import Loading from "../../loadingSpinner/Loading";
import CategoryCard from "./CategoryCard";
import Alert from "../../../UI/Alert";
import { AuthContext } from "../../../context/authContext";
import Pagination from "../../pagination/Pagination";

export default function CategoriesPortal() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);
  const { sendRequest: fetchCategories } = useHttp();
  const { sendRequest: deleteCategory } = useHttp();
  const { sendRequest: updateCategory } = useHttp();
  const { token } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const docsLimit = 3;

  useEffect(() => {
    (async function () {
      try {
        const response = await fetchCategories({
          endpoint: `category?page=${currentPage}&limit=${docsLimit}`,
        });
        const { categories, totalDocs } = response.data;
        setCategories(categories);
        setTotalPages(Math.ceil(totalDocs / docsLimit));
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    })();
  }, [fetchCategories, currentPage, docsLimit]);

  const deleteCategoryHandler = async (id) => {
    try {
      await deleteCategory({
        endpoint: `category/${id}`,
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
      });
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== id)
      );
      setAlert({ scenario: "success", message: "Category deleted" });
    } catch (err) {
      setAlert({ scenario: "error", message: err.message });
    }
  };

  const updateCategoryHandler = async (id, updatedCategory) => {
    try {
      await updateCategory({
        endpoint: `category/${id}`,
        method: "PATCH",
        headers: { Authorization: "Bearer " + token },
      });
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === id ? updatedCategory : category
        )
      );
      setAlert({ scenario: "success", message: "Category updated" });
    } catch (err) {
      setAlert({ scenario: "error", message: err.message });
    }
  };

  if (isLoading) return <Loading />;
  if (error)
    return <h4 className="fs-4 text-center mt-5 text-light">{error}</h4>;

  let content = categories.map((category) => {
    return (
      <CategoryCard
        key={category._id}
        category={category}
        onDelete={deleteCategoryHandler.bind(null, category._id)}
        onUpdate={(updatedCategory) =>
          updateCategoryHandler(category._id, updatedCategory)
        }
      />
    );
  });

  return (
    <>
      {alert && (
        <Alert
          scenario={alert.scenario}
          message={alert.message}
          dismiss={() => setAlert(null)}
        />
      )}
      <div className="py-3 px-1 py-md-4 px-md-5">
        <h4 className="text-light text-uppercase mb-2 mb-3">
          Available Categories
        </h4>
        <div>{content}</div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
}
