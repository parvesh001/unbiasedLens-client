import React, { useState, useContext } from "react";
import { AuthContext } from "../../../../context/authContext";
import { useNavigate } from "react-router-dom";
import useHttp from "../../../../hooks/use-http";
import useInput from "../../../../hooks/useInput";
import Input from "../../../../UI/Input";
import Alert from "../../../../UI/Alert";
import Loading from "../../../loadingSpinner/Loading";
import { CategoryContext } from "../../../../context/categoryContext";

export default function AddCategoryForm() {
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { sendRequest: createCategory } = useHttp();
  const { token } = useContext(AuthContext);
  const {addCategory} = useContext(CategoryContext)
  const navigate = useNavigate();

  const {
    authorInput: categoryNameInput,
    authorInputIsValid: categoryNameInputIsValid,
    authorInputBlurHandler: categoryNameInputBlurHandler,
    authorInputChangeHandler: categoryNameInputChangeHandler,
    hasError: categoryNameInputHasError,
  } = useInput((value) => value.trim().length > 5 && value.trim().length < 30);
  const {
    authorInput: categoryDescriptionInput,
    authorInputIsValid: categoryDescriptionInputIsValid,
    authorInputBlurHandler: categoryDescriptionInputBlurHandler,
    authorInputChangeHandler: categoryDescriptionInputChangeHandler,
    hasError: categoryDescriptionInputHasError,
  } = useInput((value) => value.trim().length < 100);

  let formIsValid = false;
  if (categoryDescriptionInputIsValid && categoryNameInputIsValid) {
    formIsValid = true;
  }

  const categoryFormSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) return;
    setIsLoading(true);

    try {
      const response = await createCategory({
        endpoint: "category",
        method: "POST",
        body: JSON.stringify({
          name: categoryNameInput,
          description: categoryDescriptionInput,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      addCategory(response.category)
      setAlert({ scenario: "success", message: "Category Added" });
      setIsLoading(false);
      setTimeout(()=>{
            navigate('/admin-portal/categories')
      },1500)
    } catch (err) {
      setIsLoading(false);
      setAlert({ scenario: "error", message: err.message });
    }
  };

  const categoryNameInputClass = categoryNameInputHasError ? "is-invalid" : "";
  const categoryDescriptionInputClass = categoryDescriptionInputHasError
    ? "is-invalid"
    : "";

  return (
    <>
      {alert && (
        <Alert
          scenario={alert.scenario}
          message={alert.message}
          dismiss={() => setAlert(null)}
        />
      )}
      {isLoading && <Loading />}
      <form onSubmit={categoryFormSubmitHandler}>
        <Input
          label="Caegory Name"
          id="categoryName"
          className={categoryNameInputClass}
          type="text"
          placeholder="Category Name"
          value={categoryNameInput}
          onBlur={categoryNameInputBlurHandler}
          onChange={categoryNameInputChangeHandler}
          invalidFeedback="Category Name must contain less than 30 and more than 5 chars"
        />

        <Input
          label="Caegory Description"
          id="categoryDescription"
          className={categoryDescriptionInputClass}
          type="text"
          placeholder="Category Description"
          value={categoryDescriptionInput}
          onBlur={categoryDescriptionInputBlurHandler}
          onChange={categoryDescriptionInputChangeHandler}
          invalidFeedback="Category description must contain less than 100 chars"
        />

        <button
          type="submit"
          className="btn btn-primary"
          disabled={!formIsValid}
        >
          Add
        </button>
      </form>
    </>
  );
}
