import React, { useContext } from "react";
import UploadProfile from "../../components/profile/UploadProfile";
import { AuthContext } from "../../context/authContext";
import { useParams } from "react-router-dom";

export default function UploadProfilePage() {
  const { id } = useParams();
  const { author } = useContext(AuthContext);

  const content =
    author && author._id === id ? (
      <UploadProfile />
    ) : (
      <p
        className="text-light text-center fs-4 my-5"
        style={{ minHeight: "86vh" }}
      >
        This route is author specific route, please go back
      </p>
    );

  return content;
}
