import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import CurrentAuthorProfile from "../../components/profile/current/CurrentAuthorProfile";
import ErrorBoundary from "../../components/errorBoundary/ErrorBoundary";
import styles from "./ProfilePage.module.scss";

export default function ProfilePage() {
  const { id } = useParams();
  const { author } = useContext(AuthContext);

  return (
    <div className={styles.profilePage}>
      <ErrorBoundary>
        {author._id === id ? <CurrentAuthorProfile /> : <p>other author</p>}
      </ErrorBoundary>
    </div>
  );
}
