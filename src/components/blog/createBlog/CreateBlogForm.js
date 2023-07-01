import React, { useState } from "react";
import Input from "../../../UI/Input";
import useInput from "../../../hooks/useInput";
import styles from "./CreateBlogForm.module.scss";

export default function CreateBlogForm({ blogCategories }) {
  const {
    authorInput: authorTitleInput,
    authorInputIsValid: authorTitleInputIsValid,
    authorInputBlurHandler: authorTitleInputBlurHandler,
    authorInputChangeHandler: authorTitleInputChangeHandler,
    hasError: authorTitleInputHasError,
  } = useInput((value) => value.trim().length > 26 && value.trim().length < 40);
  const {
    authorInput: authorCategoryInput,
    authorInputIsValid: authorCategoryInputIsValid,
    authorInputBlurHandler: authorCategoryInputBlurHandler,
    authorInputChangeHandler: authorCategoryInputChangeHandler,
    hasError: authorCategoryInputHasError,
  } = useInput((value) => value !== "");
  const {
    authorInput: authorContentInput,
    authorInputIsValid: authorContentInputIsValid,
    authorInputBlurHandler: authorContentInputBlurHandler,
    authorInputChangeHandler: authorContentInputChangeHandler,
    hasError: authorContentInputHasError,
  } = useInput((value) => value.trim().length > 2000);

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileIsTouched, setFileIsTouched] = useState(false);
  const fileInputIsValid = selectedFile
  const fileInputHasError = !fileInputIsValid && fileIsTouched;
  
  const fileTouchHandler = () => {
    setFileIsTouched(true);
  };
  const fileChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  let formIsValid = false;
  if (
    authorTitleInputIsValid &&
    authorCategoryInputIsValid &&
    fileInputIsValid &&
    authorContentInputIsValid
  ) {
    formIsValid = true;
  }

  const titleInputClass = authorTitleInputHasError ? "is-invalid" : "";
  const categoryInputClass = authorCategoryInputHasError ? "is-invalid" : "";
  const fileInputClass = fileInputHasError ? "is-invalid" : "";
  const contentInputClass = authorContentInputHasError ? "is-invalid" : "";

  return (
    <form className={styles.createBlog}>
      <Input
        label="Blog Title"
        id="blogTitle"
        className={titleInputClass}
        type="text"
        placeholder="Blog Title"
        value={authorTitleInput}
        onBlur={authorTitleInputBlurHandler}
        onChange={authorTitleInputChangeHandler}
        invalidFeedback="Title must be more than 26 characters and less than 40 charachters"
      />
      <div className="mb-3 text-secondary">
        <label htmlFor="validationServer04" className="form-label">
          Select Cateogry
        </label>
        <select
          className={`form-select form-select-lg text-secondary ${categoryInputClass} ${styles.selectCategory}`}
          id="validationServer04"
          aria-describedby="validationServer04Feedback"
          value={authorCategoryInput}
          onBlur={authorCategoryInputBlurHandler}
          onChange={authorCategoryInputChangeHandler}
          required
        >
          <option selected value="">
            Select Blog Category
          </option>
          {blogCategories}
        </select>
        <div id="validationServer01Feedback" className="invalid-feedback">
          Please select a valid category.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="blogFile" className="form-label text-secondary">
          Select an image file
        </label>
        <input
          className={`form-control form-control-lg ${fileInputClass} ${styles.selectImage}`}
          type="file"
          id="blogFile"
          aria-describedby="validationServer02Feedback"
          onBlur={fileTouchHandler}
          onChange={fileChangeHandler}
        />
        <div id="validationServer02Feedback" className="invalid-feedback">
          Please provide an appropriate image file.
        </div>
      </div>
      <div className="form-floating mb-3">
        <textarea
          className={`form-control ${contentInputClass} ${styles.textarea}`}
          placeholder="Leave a comment here"
          id="floatingTextarea2"
          aria-describedby="validationServer03Feedback"
          value={authorContentInput}
          onChange={authorContentInputChangeHandler}
          onBlur={authorContentInputBlurHandler}
        ></textarea>
        <label htmlFor="floatingTextarea2" className="text-secondary">
          Blog Content
        </label>
        <div id="validationServer03Feedback" className="invalid-feedback">
          Blog must contain minimum 200 words.
        </div>
      </div>
      <button type="submit" className="btn btn-primary" disabled={!formIsValid}>
        Submit
      </button>
    </form>
  );
}
