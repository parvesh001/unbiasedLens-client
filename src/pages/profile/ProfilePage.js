import React, { useContext} from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import CurrentAuthorProfile from "../../components/profile/current/CurrentAuthorProfile";
import OtherAuthorProfile from "../../components/profile/other/OtherAuthorProfile";
import styles from "./ProfilePage.module.scss";

export default function ProfilePage() {
  const { id } = useParams();
  const { author} = useContext(AuthContext);
  

  return (
    <div className={styles.profilePage}>
      {author && author._id === id ? (
        <CurrentAuthorProfile />
      ) : (
        <OtherAuthorProfile id={id} />
      )}
    </div>
  );
}
