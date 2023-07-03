import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import CurrentAuthorProfile from "../../components/profile/current/CurrentAuthorProfile";
import styles from "./ProfilePage.module.scss";

export default function ProfilePage() {
  const { id } = useParams();
  const { author } = useContext(AuthContext);

  return (
    <div className={styles.profilePage}>
      {author._id === id ? <CurrentAuthorProfile /> : <p>other author</p>}
    </div>
  );
}
