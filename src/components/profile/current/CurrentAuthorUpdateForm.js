import React from "react";
import Input from "../../../UI/Input";
import useInput from "../../../hooks/useInput";

export default function CurrentAuthorUpdateForm({ onAuthorUpdate }) {
  const {
    authorInput: authorNameInput,
    authorInputIsValid: authorNameInputIsValid,
    authorInputBlurHandler: authorNameInputBlurHandler,
    authorInputChangeHandler: authorNameInputChangeHandler,
    hasError: authorNameInputHasError,
  } = useInput((value) =>
    /^[a-zA-ZÀ-ÖØ-öø-ÿ]+([ '-][a-zA-ZÀ-ÖØ-öø-ÿ]+)*$/.test(value)
  );

  const {
    authorInput: authorEmailInput,
    authorInputIsValid: authorEmailInputIsValid,
    hasError: authorEmailInputHasError,
    authorInputChangeHandler: authorEmailInputChangeHandler,
    authorInputBlurHandler: authorEmailInputBlurHandler,
  } = useInput((value) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
  );
  let formIsValid = false;
  if (authorNameInputIsValid && authorEmailInputIsValid) {
    formIsValid = true;
  }
  const updateFormSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) return;
    onAuthorUpdate({ name: authorNameInput, email: authorEmailInput });
  };

  const nameInputClass = authorNameInputHasError ? "is-invalid" : "";
  const emailInputClass = authorEmailInputHasError ? "is-invalid" : "";

  return (
    <div className="mt-3">
      <h4 className="text-primary"> Update Your Credentials</h4>
      <form onSubmit={updateFormSubmitHandler}>
        <Input
          type="text"
          label="Update Name"
          className={nameInputClass}
          id="update-name"
          placeholder="Update Your Name"
          onBlur={authorNameInputBlurHandler}
          onChange={authorNameInputChangeHandler}
          value={authorNameInput}
          invalidFeedback="Please provide valid name input"
        />
        <Input
          type="email"
          label="Update Email"
          className={emailInputClass}
          id="update-email"
          placeholder="Update Your Email"
          onBlur={authorEmailInputBlurHandler}
          onChange={authorEmailInputChangeHandler}
          value={authorEmailInput}
          invalidFeedback="Please provide valid email input"
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!formIsValid}
        >
          Update
        </button>
      </form>
    </div>
  );
}
