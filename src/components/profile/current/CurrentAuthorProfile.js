import React from "react";
import AuthorDetails from '../AuthorDetails'
import styles from './CurrentAuthorProfile.module.scss';

export default function CurrentAuthorProfile() {
  return (
    <div className={styles.currentAuthorProfile}>
      <AuthorDetails/>
    </div>
  );
}
