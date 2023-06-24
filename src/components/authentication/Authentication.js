import React from "react";
import styles from "./Authentication.module.scss";

export default function Authentication() {
  return (
    <div className={styles.authentication}>
      <div className={styles.authenticationContainer}>
        <div className={styles.authenticationRightBox}>
          <div className={styles.authenticationImg}>
            <img
              src="/img/background.jpg"
              alt="space background"
            />
          </div>
          <div className={styles.slogan}>
            <h1>Your Voice. Your Story. Write With Unbiased Lens</h1>
            <p>
              Discover a new perspective with UnbiasedLens. Dive into a world of
              insightful articles, thought-provoking opinions, and diverse
              voices. Explore captivating stories that challenge your beliefs,
              broaden your horizons, and spark meaningful conversations.
              UnbiasedLens is your gateway to a balanced and unbiased view of
              the world. Embrace the power of knowledge, engage with different
              perspectives, and unlock the truth. Join our community and embark
              on a journey of discovery with UnbiasedLens, where unbiased
              storytelling meets your curious mind.
            </p>
          </div>
        </div>
        <div className={styles.authenticationLeftBox}></div>
      </div>
    </div>
  );
}
