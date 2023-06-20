import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={`bg-body-secondary text-center py-4 ${styles.footer}`}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <img
              src="/img/brand.png"
              className={styles.logo}
              alt="Unbiased Lens"
            />
            <p className={styles.slogan}>
              Your voice. Your story. Write with Unbiased Lens.
            </p>
            <p className={styles.warning}>
              &copy; {new Date().getFullYear()} Unbiased Lens. All rights
              reserved. Unauthorized copying or distribution of any content on
              this website is strictly prohibited.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
