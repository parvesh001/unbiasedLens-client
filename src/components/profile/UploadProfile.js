import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import styles from "./UploadProfile.module.scss";
import { useNavigate } from "react-router-dom";
import Loading from "../loadingSpinner/Loading";
import useHttp from "../../hooks/use-http";
import Alert from "../../UI/Alert";

export default function UploadProfile() {
  const [selectedImage, setSelectedImage] = useState(null);
  const { author, token, updateProfile } = useContext(AuthContext);
  const { sendRequest: uploadProfilePicture } = useHttp();
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  let formIsValid = false;
  if (selectedImage) {
    formIsValid = true;
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const imageUploadFormSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) return;
    setIsLoading(true);
    let endpoint;
    let method;
    if (author.photo.includes("default.png")) {
      endpoint = "authors/uploadProfile";
      method = "POST";
    } else {
      endpoint = "authors/updateProfile";
      method = "PATCH";
    }
    console.log(endpoint)
    const formData = new FormData();
    formData.append("profilePicture", selectedImage);
    try {
      const response = await uploadProfilePicture({
        endpoint,
        method,
        body: formData,
        headers: { Authorization: "Bearer " + token },
      });
      const newImageUrl = response.data.newImageUrl;
      updateProfile(newImageUrl);
      setIsLoading(false);
      navigate(`/author/${author.name}/${author._id}`);
    } catch (err) {
      setAlert({ scenario: "error", message: err.message });
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      {alert && (
        <Alert
          scenario={alert.scenario}
          message={alert.message}
          dismiss={() => setAlert(null)}
        />
      )}
      <form
        className={styles["container"]}
        onSubmit={imageUploadFormSubmitHandler}
      >
        <h2>Select Your Profile Picture</h2>
        <div className={styles["upload-container"]}>
          <label htmlFor="fileInput" className={styles["upload-label"]}>
            <span>Click to Select</span>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
        </div>
        {selectedImage && (
          <div className={styles["preview-container"]}>
            <h3>Preview:</h3>
            <img
              className={styles["preview-image"]}
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
            />
          </div>
        )}
        <button
          type="submit"
          className="btn btn-light mt-3"
          disabled={!formIsValid}
        >
          Upload
        </button>
      </form>
    </>
  );
}
