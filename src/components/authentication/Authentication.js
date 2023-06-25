import React, { useState } from "react";
import styles from "./Authentication.module.scss";
import Login from "./authForms/Login";
import Registration from "./authForms/Registration";

export default function Authentication() {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className={styles.authentication}>
      <div className={styles.authenticationContainer}>
        <div className={styles.authenticationRightBox}>
          <div className={styles.slogan}>
            <h1>Your Voice. Your Story. Write With Unbiased Lens</h1>
            <p>
              Discover a new perspective with UnbiasedLens. Dive into a world of
              insightful articles, thought-provoking opinions, and diverse
              voices. Explore captivating stories that challenge your beliefs,
              broaden your horizons, and spark meaningful conversations.
            </p>
          </div>
        </div>
        <div className={styles.authenticationLeftBox}>
          {isRegistering && (
            <Registration
              onLogingWithExistingAcc={() => setIsRegistering(false)}
            />
          )}
          {!isRegistering && (
            <Login
              onRegisteringState
              onCreatingNewAcc={() => setIsRegistering(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
