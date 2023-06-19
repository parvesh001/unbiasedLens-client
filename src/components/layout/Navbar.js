import React from "react";
import { NavLink } from "react-router-dom";
import { RiMenu4Line } from "react-icons/ri";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const categories = [
    "Developers World",
    "Web App",
    "MERN Stack",
    "Database",
    "API Developement",
    "App Security",
    "Coding",
    "Python",
  ];
  const showedCategories = [];
  const moreCategories = [];

  for (let i = 0; i < 4; i++) {
    if (categories[i]) {
      showedCategories.push(categories[i]);
    }
  }

  for (let i = 4; i < categories.length; i++) {
    moreCategories.push(categories[i]);
  }

  const navLinks = showedCategories.map((category, index) => {
    return (
      <li className="nav-item">
        <NavLink
          className="nav-link"
          activeClassName={styles.active}
          to={`/${category}`}
        >
          {category}
        </NavLink>
      </li>
    );
  });

  const moreNavLinks = moreCategories.map((category) => {
    return (
      <li>
        <NavLink
          className="dropdown-item text-body-secondary"
          activeClassName={styles.active}
          to={`/${category}`}
        >
          {category}
        </NavLink>
      </li>
    );
  });
 
  return (
    <nav className="navbar navbar-expand-md bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src="/img/brand.png"
            className={styles.brandImage}
            alt="Unbiased Lens"
          />
        </a>
        <button
          className={`navbar-toggler ${styles["toggler"]}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <RiMenu4Line className="text-primary fs-2" />
        </button>
        <div
          className="collapse navbar-collapse mt-2"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navLinks}
            <li className="nav-item dropdown mt-2">
              <div
                className="dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                More
              </div>
              <ul className="dropdown-menu">{moreNavLinks}</ul>
            </li>
            <li className="nav-item dropdown mt-2">
              <div
                className={`dropdown-toggle d-flex ${styles.dropdownToggle}`}
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className={styles.profile}>
                  <img src="/img/user-1.jpg" className="w-100" alt="user" />
                </div>
              </div>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="/">
                    Action
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
